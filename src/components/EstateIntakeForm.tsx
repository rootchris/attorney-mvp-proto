import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, FileText, Download, ArrowLeft } from "lucide-react";
import { EstateIntakeFormData } from "@/types/intake";

const EstateIntakeForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();
  
  const { register, control, watch, handleSubmit, formState: { errors } } = useForm<EstateIntakeFormData>({
    defaultValues: {
      personalInfo: {
        fullName: "",
        dateOfBirth: "",
        address: "",
        email: "",
        phone: ""
      },
      hasSpouse: false,
      hasChildren: false,
      children: [],
      hasOtherDependents: false,
      dependents: [],
      alternateGuardians: [],
      ownsRealEstate: false,
      properties: [],
      hasFinancialAccounts: false,
      financialAccounts: [],
      ownsBusiness: false,
      businesses: [],
      ownsPropertyMultipleStates: false,
      financialDecisionMaker: { name: "", email: "", phone: "", relationship: "" },
      healthcareDecisionMaker: { name: "", email: "", phone: "", relationship: "" },
      hasEndOfLifeWishes: false,
      planningGoals: [],
      hasExistingDocuments: false
    }
  });

  const { fields: childrenFields, append: appendChild, remove: removeChild } = useFieldArray({
    control,
    name: "children"
  });

  const { fields: dependentsFields, append: appendDependent, remove: removeDependent } = useFieldArray({
    control,
    name: "dependents"
  });

  const { fields: guardiansFields, append: appendGuardian, remove: removeGuardian } = useFieldArray({
    control,
    name: "alternateGuardians"
  });

  const { fields: propertiesFields, append: appendProperty, remove: removeProperty } = useFieldArray({
    control,
    name: "properties"
  });

  const { fields: accountsFields, append: appendAccount, remove: removeAccount } = useFieldArray({
    control,
    name: "financialAccounts"
  });

  const { fields: businessesFields, append: appendBusiness, remove: removeBusiness } = useFieldArray({
    control,
    name: "businesses"
  });

  const watchedValues = watch();
  const planningGoalOptions = [
    "Avoid probate",
    "Minimize taxes", 
    "Protect assets from creditors/divorce",
    "Charitable giving",
    "Preserve family legacy"
  ];

  const sections = [
    "Personal Information",
    "Family & Beneficiaries", 
    "Guardianship",
    "Assets & Finances",
    "Decision-Making",
    "Estate Planning Goals",
    "Existing Documents"
  ];

  const onSubmit = (data: EstateIntakeFormData) => {
    console.log("Form Data:", data);
    setShowSummary(true);
  };

  const downloadSummary = () => {
    const summary = {
      personalInfo: watchedValues.personalInfo,
      familyStructure: {
        spouse: watchedValues.hasSpouse ? watchedValues.spouse : null,
        children: watchedValues.children,
        dependents: watchedValues.dependents
      },
      assets: {
        realEstate: watchedValues.properties,
        financialAccounts: watchedValues.financialAccounts,
        businesses: watchedValues.businesses,
        multiStateProperty: watchedValues.ownsPropertyMultipleStates
      },
      decisionMakers: {
        financial: watchedValues.financialDecisionMaker,
        healthcare: watchedValues.healthcareDecisionMaker
      },
      goals: watchedValues.planningGoals,
      existingDocuments: watchedValues.hasExistingDocuments
    };
    
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estate-intake-${watchedValues.personalInfo.fullName.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center gap-2 justify-center">
                <FileText className="h-6 w-6" />
                Intake Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p><strong>Name:</strong> {watchedValues.personalInfo.fullName}</p>
                  <p><strong>Email:</strong> {watchedValues.personalInfo.email}</p>
                  <p><strong>Phone:</strong> {watchedValues.personalInfo.phone}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Family Structure</h3>
                  <p><strong>Spouse:</strong> {watchedValues.hasSpouse ? 'Yes' : 'No'}</p>
                  <p><strong>Children:</strong> {watchedValues.children.length}</p>
                  <p><strong>Other Dependents:</strong> {watchedValues.dependents.length}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Assets</h3>
                  <p><strong>Real Estate Properties:</strong> {watchedValues.properties.length}</p>
                  <p><strong>Financial Accounts:</strong> {watchedValues.financialAccounts.length}</p>
                  <p><strong>Businesses:</strong> {watchedValues.businesses.length}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Planning Goals</h3>
                  <ul className="list-disc list-inside text-sm">
                    {watchedValues.planningGoals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={downloadSummary} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Summary
                </Button>
                <Button variant="outline" onClick={() => setShowSummary(false)}>
                  Edit Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Estate Planning Client Intake</CardTitle>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index <= currentSection ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Section {currentSection + 1} of {sections.length}: {sections[currentSection]}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Section 1: Personal Information */}
              {currentSection === 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        {...register("personalInfo.fullName", { required: "Full name is required" })}
                        className={errors.personalInfo?.fullName ? "border-destructive" : ""}
                      />
                      {errors.personalInfo?.fullName && (
                        <p className="text-sm text-destructive mt-1">{errors.personalInfo.fullName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...register("personalInfo.dateOfBirth", { required: "Date of birth is required" })}
                        className={errors.personalInfo?.dateOfBirth ? "border-destructive" : ""}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        {...register("personalInfo.address", { required: "Address is required" })}
                        className={errors.personalInfo?.address ? "border-destructive" : ""}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("personalInfo.email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })}
                        className={errors.personalInfo?.email ? "border-destructive" : ""}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("personalInfo.phone", { required: "Phone is required" })}
                        className={errors.personalInfo?.phone ? "border-destructive" : ""}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2: Family & Beneficiaries */}
              {currentSection === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Family & Beneficiaries</h3>
                  
                  {/* Spouse/Partner */}
                  <div>
                    <Label className="text-base font-medium">Do you have a spouse/partner?</Label>
                    <RadioGroup
                      value={watchedValues.hasSpouse ? "yes" : "no"}
                      onValueChange={(value) => {
                        const form = document.querySelector('input[name="hasSpouse"]') as HTMLInputElement;
                        if (form) form.checked = value === "yes";
                      }}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="spouse-yes" />
                        <Label htmlFor="spouse-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="spouse-no" />
                        <Label htmlFor="spouse-no">No</Label>
                      </div>
                    </RadioGroup>
                    <input type="hidden" {...register("hasSpouse")} />
                  </div>

                  {watchedValues.hasSpouse && (
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Spouse/Partner Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="spouseName">Name</Label>
                          <Input id="spouseName" {...register("spouse.name")} />
                        </div>
                        <div>
                          <Label htmlFor="spouseDOB">Date of Birth</Label>
                          <Input id="spouseDOB" type="date" {...register("spouse.dateOfBirth")} />
                        </div>
                        <div>
                          <Label htmlFor="spouseEmail">Email</Label>
                          <Input id="spouseEmail" type="email" {...register("spouse.email")} />
                        </div>
                        <div>
                          <Label htmlFor="spousePhone">Phone</Label>
                          <Input id="spousePhone" type="tel" {...register("spouse.phone")} />
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Children */}
                  <div>
                    <Label className="text-base font-medium">Do you have children?</Label>
                    <RadioGroup
                      value={watchedValues.hasChildren ? "yes" : "no"}
                      onValueChange={(value) => {
                        const form = document.querySelector('input[name="hasChildren"]') as HTMLInputElement;
                        if (form) form.checked = value === "yes";
                      }}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="children-yes" />
                        <Label htmlFor="children-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="children-no" />
                        <Label htmlFor="children-no">No</Label>
                      </div>
                    </RadioGroup>
                    <input type="hidden" {...register("hasChildren")} />
                  </div>

                  {watchedValues.hasChildren && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Children</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => appendChild({ name: "", dateOfBirth: "", relationship: "biological", specialNeeds: false })}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Child
                        </Button>
                      </div>
                      
                      {childrenFields.map((field, index) => (
                        <Card key={field.id} className="p-4 mb-4">
                          <div className="flex justify-between items-center mb-3">
                            <h5 className="font-medium">Child {index + 1}</h5>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeChild(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`child-name-${index}`}>Name</Label>
                              <Input id={`child-name-${index}`} {...register(`children.${index}.name`)} />
                            </div>
                            <div>
                              <Label htmlFor={`child-dob-${index}`}>Date of Birth</Label>
                              <Input id={`child-dob-${index}`} type="date" {...register(`children.${index}.dateOfBirth`)} />
                            </div>
                            <div>
                              <Label htmlFor={`child-relationship-${index}`}>Relationship</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="biological">Biological</SelectItem>
                                  <SelectItem value="adopted">Adopted</SelectItem>
                                  <SelectItem value="stepchild">Stepchild</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox {...register(`children.${index}.specialNeeds`)} />
                              <Label>Special Needs</Label>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Other Dependents */}
                  <div>
                    <Label className="text-base font-medium">Do you have other dependents (elderly parents, special needs adults, etc.)?</Label>
                    <RadioGroup
                      value={watchedValues.hasOtherDependents ? "yes" : "no"}
                      onValueChange={(value) => {
                        const form = document.querySelector('input[name="hasOtherDependents"]') as HTMLInputElement;
                        if (form) form.checked = value === "yes";
                      }}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="dependents-yes" />
                        <Label htmlFor="dependents-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="dependents-no" />
                        <Label htmlFor="dependents-no">No</Label>
                      </div>
                    </RadioGroup>
                    <input type="hidden" {...register("hasOtherDependents")} />
                  </div>

                  {watchedValues.hasOtherDependents && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Other Dependents</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => appendDependent({ name: "", dateOfBirth: "", relationship: "", careNeeds: "" })}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Dependent
                        </Button>
                      </div>
                      
                      {dependentsFields.map((field, index) => (
                        <Card key={field.id} className="p-4 mb-4">
                          <div className="flex justify-between items-center mb-3">
                            <h5 className="font-medium">Dependent {index + 1}</h5>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeDependent(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Name</Label>
                              <Input {...register(`dependents.${index}.name`)} />
                            </div>
                            <div>
                              <Label>Date of Birth</Label>
                              <Input type="date" {...register(`dependents.${index}.dateOfBirth`)} />
                            </div>
                            <div>
                              <Label>Relationship</Label>
                              <Input {...register(`dependents.${index}.relationship`)} />
                            </div>
                            <div>
                              <Label>Care Needs</Label>
                              <Input {...register(`dependents.${index}.careNeeds`)} />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Separator />
              
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                >
                  Previous
                </Button>
                
                {currentSection < sections.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentSection(currentSection + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit">
                    Submit & Generate Summary
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Footer with link back to attorney dashboard */}
        <div className="mt-6 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Attorney Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstateIntakeForm;
