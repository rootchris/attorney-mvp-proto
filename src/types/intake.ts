export interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  address: string;
  email: string;
  phone: string;
}

export interface SpousePartner {
  name: string;
  dateOfBirth: string;
  email: string;
  phone: string;
}

export interface Child {
  name: string;
  dateOfBirth: string;
  relationship: 'biological' | 'adopted' | 'stepchild';
  specialNeeds: boolean;
  specialNeedsDetails?: string;
}

export interface Dependent {
  name: string;
  dateOfBirth: string;
  relationship: string;
  careNeeds: string;
}

export interface Guardian {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Property {
  address: string;
  ownershipType: string;
  estimatedValue: number;
  hasMortgage: boolean;
}

export interface FinancialAccount {
  type: string;
  provider: string;
  approximateValue: number;
}

export interface Business {
  entityType: string;
  ownershipPercentage: number;
  estimatedValue: number;
}

export interface DecisionMaker {
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface EstateIntakeFormData {
  // Personal Information
  personalInfo: PersonalInfo;
  
  // Family & Beneficiaries
  hasSpouse: boolean;
  spouse?: SpousePartner;
  hasChildren: boolean;
  children: Child[];
  hasOtherDependents: boolean;
  dependents: Dependent[];
  
  // Guardianship
  primaryGuardian?: Guardian;
  alternateGuardians: Guardian[];
  
  // Assets & Finances
  ownsRealEstate: boolean;
  properties: Property[];
  hasFinancialAccounts: boolean;
  financialAccounts: FinancialAccount[];
  ownsBusiness: boolean;
  businesses: Business[];
  ownsPropertyMultipleStates: boolean;
  
  // Decision-Making
  financialDecisionMaker: DecisionMaker;
  healthcareDecisionMaker: DecisionMaker;
  hasEndOfLifeWishes: boolean;
  endOfLifeWishes?: string;
  
  // Estate Planning Goals
  planningGoals: string[];
  otherGoals?: string;
  
  // Existing Documents
  hasExistingDocuments: boolean;
  existingDocuments?: File[];
  documentsLastUpdated?: string;
}
