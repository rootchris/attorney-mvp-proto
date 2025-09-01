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
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, FileText, Download, ArrowLeft, CheckCircle } from "lucide-react";
import { EstateIntakeFormData } from "@/types/intake";

const EstateIntakeForm = () => {
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
    { id: "personal", title: "Personal Information", completed: !!watchedValues.personalInfo?.fullName },
    { id: "family", title: "Family & Beneficiaries", completed: watchedValues.hasSpouse !== undefined },
    { id: "guardianship", title: "Guardianship", completed: (!watchedValues.hasChildren && !watchedValues.hasOtherDependents) || (watchedValues.hasChildren && watchedValues.primaryGuardian?.name) },
    { id: "assets", title: "Assets & Finances", completed: watchedValues.ownsRealEstate !== undefined },
    { id: "decisions", title: "Decision-Making", completed: !!watchedValues.financialDecisionMaker?.name },
    { id: "goals", title: "Estate Planning Goals", completed: watchedValues.planningGoals.length > 0 },
    { id: "documents", title: "Existing Documents", completed: watchedValues.hasExistingDocuments !== undefined }
  ];

  const completedSections = sections.filter(s => s.completed).length;
  const progressPercentage = (completedSections / sections.length) * 100;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header with Progress */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Estate Planning Client Intake</CardTitle>
            <div className="space-y-4 mt-4">
              <div className="flex justify-center">
                <div className="text-sm text-muted-foreground">
                  Progress: {completedSections} of {sections.length} sections completed ({Math.round(progressPercentage)}%)
                </div>
              </div>
              <Progress value={progressPercentage} className="w-full max-w-md mx-auto" />
              
              {/* Section Navigation */}
              <div className="flex flex-wrap justify-center gap-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(section.id)}
                    className={`text-xs flex items-center gap-1 ${section.completed ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {section.completed && <CheckCircle className="h-3 w-3" />}
                    {section.title}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Section 1: Personal Information */}
          <Card id="personal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {sections[0].completed && <CheckCircle className="h-5 w-5 text-primary" />}
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Section 2: Family & Beneficiaries */}
          <Card id="family">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {sections[1].completed && <CheckCircle className="h-5 w-5 text-primary" />}
                Family & Beneficiaries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Spouse/Partner */}
              <div>
                <Label className="text-base font-medium">Do you have a spouse/partner?</Label>
                <RadioGroup
                  value={watchedValues.hasSpouse ? "yes" : "no"}
                  onValueChange={(value) => {
                    const checkbox = document.querySelector('input[name="hasSpouse"]') as HTMLInputElement;
                    if (checkbox) checkbox.checked = value === "yes";
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
                <input type="checkbox" {...register("hasSpouse")} className="hidden" />
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
                    const checkbox = document.querySelector('input[name="hasChildren"]') as HTMLInputElement;
                    if (checkbox) checkbox.checked = value === "yes";
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
                <input type="checkbox" {...register("hasChildren")} className="hidden" />
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
                          <Label>Relationship</Label>
                          <RadioGroup defaultValue="biological" className="flex gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="biological" id={`bio-${index}`} />
                              <Label htmlFor={`bio-${index}`}>Biological</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="adopted" id={`adopted-${index}`} />
                              <Label htmlFor={`adopted-${index}`}>Adopted</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="stepchild" id={`step-${index}`} />
                              <Label htmlFor={`step-${index}`}>Stepchild</Label>
                            </div>
                          </RadioGroup>
                          <input type="hidden" {...register(`children.${index}.relationship`)} />
                        </div>
                        <div className="flex items-center space-x-2 mt-6">
                          <Checkbox {...register(`children.${index}.specialNeeds`)} />
                          <Label>Special Needs</Label>
                        </div>
                        {watchedValues.children?.[index]?.specialNeeds && (
                          <div className="md:col-span-2">
                            <Label htmlFor={`special-needs-${index}`}>Special Needs Details</Label>
                            <Textarea id={`special-needs-${index}`} {...register(`children.${index}.specialNeedsDetails`)} />
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Other Dependents */}
              <div>
                <Label className="text-base font-medium">Do you have other dependents?</Label>
                <RadioGroup
                  value={watchedValues.hasOtherDependents ? "yes" : "no"}
                  onValueChange={(value) => {
                    const checkbox = document.querySelector('input[name="hasOtherDependents"]') as HTMLInputElement;
                    if (checkbox) checkbox.checked = value === "yes";
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
                <input type="checkbox" {...register("hasOtherDependents")} className="hidden" />
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
            </CardContent>
          </Card>

          {/* Section 3: Guardianship */}
          {(watchedValues.hasChildren || watchedValues.hasOtherDependents) && (
            <Card id="guardianship">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {sections[2].completed && <CheckCircle className="h-5 w-5 text-primary" />}
                  Guardianship
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Primary Guardian</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input {...register("primaryGuardian.name")} />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" {...register("primaryGuardian.email")} />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input type="tel" {...register("primaryGuardian.phone")} />
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Input {...register("primaryGuardian.address")} />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Alternate Guardians</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendGuardian({ name: "", email: "", phone: "", address: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Guardian
                    </Button>
                  </div>
                  
                  {guardiansFields.map((field, index) => (
                    <Card key={field.id} className="p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium">Alternate Guardian {index + 1}</h5>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeGuardian(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Name</Label>
                          <Input {...register(`alternateGuardians.${index}.name`)} />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" {...register(`alternateGuardians.${index}.email`)} />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input type="tel" {...register(`alternateGuardians.${index}.phone`)} />
                        </div>
                        <div>
                          <Label>Address</Label>
                          <Input {...register(`alternateGuardians.${index}.address`)} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 4: Assets & Finances */}
          <Card id="assets">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {sections[3].completed && <CheckCircle className="h-5 w-5 text-primary" />}
                Assets & Finances
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Real Estate */}
              <div>
                <Label className="text-base font-medium">Do you own real estate?</Label>
                <RadioGroup
                  value={watchedValues.ownsRealEstate ? "yes" : "no"}
                  onValueChange={(value) => {
                    const checkbox = document.querySelector('input[name="ownsRealEstate"]') as HTMLInputElement;
                    if (checkbox) checkbox.checked = value === "yes";
                  }}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="realestate-yes" />
                    <Label htmlFor="realestate-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="realestate-no" />
                    <Label htmlFor="realestate-no">No</Label>
                  </div>
                </RadioGroup>
                <input type="checkbox" {...register("ownsRealEstate")} className="hidden" />
              </div>

              {watchedValues.ownsRealEstate && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Properties</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendProperty({ address: "", ownershipType: "", estimatedValue: 0, hasMortgage: false })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </Button>
                  </div>
                  
                  {propertiesFields.map((field, index) => (
                    <Card key={field.id} className="p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium">Property {index + 1}</h5>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeProperty(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label>Address</Label>
                          <Input {...register(`properties.${index}.address`)} />
                        </div>
                        <div>
                          <Label>Ownership Type</Label>
                          <Input {...register(`properties.${index}.ownershipType`)} placeholder="e.g., Sole, Joint, Trust" />
                        </div>
                        <div>
                          <Label>Estimated Value</Label>
                          <Input type="number" {...register(`properties.${index}.estimatedValue`, { valueAsNumber: true })} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox {...register(`properties.${index}.hasMortgage`)} />
                          <Label>Has Mortgage</Label>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Financial Accounts */}
              <div>
                <Label className="text-base font-medium">Do you have financial accounts?</Label>
                <RadioGroup
                  value={watchedValues.hasFinancialAccounts ? "yes" : "no"}
                  onValueChange={(value) => {
                    const checkbox = document.querySelector('input[name="hasFinancialAccounts"]') as HTMLInputElement;
                    if (checkbox) checkbox.checked = value === "yes";
                  }}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="accounts-yes" />
                    <Label htmlFor="accounts-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="accounts-no" />
                    <Label htmlFor="accounts-no">No</Label>
                  </div>
                </RadioGroup>
                <input type="checkbox" {...register("hasFinancialAccounts")} className="hidden" />
              </div>

              {watchedValues.hasFinancialAccounts && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Financial Accounts</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendAccount({ type: "", provider: "", approximateValue: 0 })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Account
                    </Button>
                  </div>
                  
                  {accountsFields.map((field, index) => (
                    <Card key={field.id} className="p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium">Account {index + 1}</h5>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAccount(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Account Type</Label>
                          <Input {...register(`financialAccounts.${index}.type`)} placeholder="e.g., Checking, 401k, IRA" />
                        </div>
                        <div>
                          <Label>Provider</Label>
                          <Input {...register(`financialAccounts.${index}.provider`)} placeholder="e.g., Bank of America" />
                        </div>
                        <div>
                          <Label>Approximate Value</Label>
                          <Input type="number" {...register(`financialAccounts.${index}.approximateValue`, { valueAsNumber: true })} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Business Ownership */}
              <div>
                <Label className="text-base font-medium">Do you own a business?</Label>
                <RadioGroup
                  value={watchedValues.ownsBusiness ? "yes" : "no"}
                  onValueChange={(value) => {
                    const checkbox = document.querySelector('input[name="ownsBusiness"]') as HTMLInputElement;
                    if (checkbox) checkbox.checked = value === "yes";
                  }}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="business-yes" />
                    <Label htmlFor="business-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="business-no" />
                    <Label htmlFor="business-no">No</Label>
                  </div>
                </RadioGroup>
                <input type="checkbox" {...register("ownsBusiness")} className="hidden" />
              </div>

              {watchedValues.ownsBusiness && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Business Interests</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendBusiness({ entityType: "", ownershipPercentage: 0, estimatedValue: 0 })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Business
                    </Button>
                  </div>
                  
                  {businessesFields.map((field, index) => (
                    <Card key={field.id} className="p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium">Business {index + 1}</h5>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeBusiness(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Entity Type</Label>
                          <Input {...register(`businesses.${index}.entityType`)} placeholder="e.g., LLC, Corporation" />
                        </div>
                        <div>
                          <Label>Ownership %</Label>
                          <Input type="number" max="100" {...register(`businesses.${index}.ownershipPercentage`, { valueAsNumber: true })} />
                        </div>
                        <div>
                          <Label>Estimated Value</Label>
                          <Input type="number" {...register(`businesses.${index}.estimatedValue`, { valueAsNumber: true })} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Multi-State Property */}
              <div>
                <Label className="text-base font-medium">Do you own property in multiple states?</Label>
                <RadioGroup
                  value={watchedValues.ownsPropertyMultipleStates ? "yes" : "no"}
                  onValueChange={(value) => {
                    const checkbox = document.querySelector('input[name="ownsPropertyMultipleStates"]') as HTMLInputElement;
                    if (checkbox) checkbox.checked = value === "yes";
                  }}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="multistate-yes" />
                    <Label htmlFor="multistate-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="multistate-no" />
                    <Label htmlFor="multistate-no">No</Label>
                  </div>
                </RadioGroup>
                <input type="checkbox" {...register("ownsPropertyMultipleStates")} className="hidden" />
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Decision-Making */}
          <Card id="decisions">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {sections[4].completed && <CheckCircle className="h-5 w-5 text-primary" />}
                Decision-Making
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div>
                <h4 className="font-medium mb-4">Financial Decision Maker</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input {...register("financialDecisionMaker.name")} />
                  </div>
                  <div>
                    <Label>Relationship</Label>
                    <Input {...register("financialDecisionMaker.relationship")} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" {...register("financialDecisionMaker.email")} />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input type="tel" {...register("financialDecisionMaker.phone")} />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Healthcare Decision Maker</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input {...register("healthcareDecisionMaker.name")} />
                  </div>
                  <div>
                    <Label>Relationship</Label>
                    <Input {...register("healthcareDecisionMaker.relationship")} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" {...register("healthcareDecisionMaker.email")} />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input type="tel" {...register("healthcareDecisionMaker.phone")} />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium">Do you have specific end-of-life wishes?</Label>
                <RadioGroup
                  value={watchedValues.hasEndOfLifeWishes ? "yes" : "no"}
                  onValueChange={(value) => {
                    const checkbox = document.querySelector('input[name="hasEndOfLifeWishes"]') as HTMLInputElement;
                    if (checkbox) checkbox.checked = value === "yes";
                  }}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="endoflife-yes" />
                    <Label htmlFor="endoflife-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="endoflife-no" />
                    <Label htmlFor="endoflife-no">No</Label>
                  </div>
                </RadioGroup>
                <input type="checkbox" {...register("hasEndOfLifeWishes")} className="hidden" />
              </div>

              {watchedValues.hasEndOfLifeWishes && (
                <div>
                  <Label>End-of-Life Wishes Details</Label>
                  <Textarea {...register("endOfLifeWishes")} rows={4} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 6: Estate Planning Goals */}
          <Card id="goals">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {sections[5].completed && <CheckCircle className="h-5 w-5 text-primary" />}
                Estate Planning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">What are your primary estate planning goals? (Select all that apply)</Label>
                <div className="space-y-2 mt-3">
                  {planningGoalOptions.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox 
                        value={goal}
                        checked={watchedValues.planningGoals?.includes(goal)}
                        onCheckedChange={(checked) => {
                          const currentGoals = watchedValues.planningGoals || [];
                          const newGoals = checked 
                            ? [...currentGoals, goal]
                            : currentGoals.filter(g => g !== goal);
                          // Update form manually
                          const checkboxes = document.querySelectorAll('input[name^="planningGoals"]') as NodeListOf<HTMLInputElement>;
                          checkboxes.forEach(cb => cb.checked = newGoals.includes(cb.value));
                        }}
                      />
                      <Label className="text-sm">{goal}</Label>
                    </div>
                  ))}
                </div>
                {planningGoalOptions.map((goal) => (
                  <input 
                    key={goal}
                    type="checkbox" 
                    value={goal}
                    {...register("planningGoals")}
                    className="hidden"
                  />
                ))}
              </div>

              <div>
                <Label>Other Goals (Optional)</Label>
                <Textarea {...register("otherGoals")} rows={3} placeholder="Describe any other estate planning goals..." />
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Existing Documents */}
          <Card id="documents">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {sections[6].completed && <CheckCircle className="h-5 w-5 text-primary" />}
                Existing Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div>
                <Label className="text-base font-medium">Do you have existing estate planning documents?</Label>
                <RadioGroup
                  value={watchedValues.hasExistingDocuments ? "yes" : "no"}
                  onValueChange={(value) => {
                    const checkbox = document.querySelector('input[name="hasExistingDocuments"]') as HTMLInputElement;
                    if (checkbox) checkbox.checked = value === "yes";
                  }}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="docs-yes" />
                    <Label htmlFor="docs-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="docs-no" />
                    <Label htmlFor="docs-no">No</Label>
                  </div>
                </RadioGroup>
                <input type="checkbox" {...register("hasExistingDocuments")} className="hidden" />
              </div>

              {watchedValues.hasExistingDocuments && (
                <div className="space-y-4">
                  <div>
                    <Label>When were your documents last updated?</Label>
                    <Input type="date" {...register("documentsLastUpdated")} />
                  </div>
                  
                  <div>
                    <Label>Upload Existing Documents (Optional)</Label>
                    <Input type="file" multiple accept=".pdf,.doc,.docx" {...register("existingDocuments")} />
                    <p className="text-sm text-muted-foreground mt-1">
                      You can upload PDFs or Word documents of your existing wills, trusts, or other estate planning documents.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Complete Intake Form
                </Button>
                <p className="text-sm text-muted-foreground">
                  Review all sections before submitting. You can use the navigation above to jump to any section.
                </p>
              </div>
            </CardContent>
          </Card>
        </form>

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
