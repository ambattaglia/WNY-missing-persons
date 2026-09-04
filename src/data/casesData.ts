export type CaseType = 'Missing Person' | 'Unidentified Person';
export type CaseStatus = 'Active' | 'Cold Case' | 'Resolved';

export interface CaseRecord {
  id: string;
  type: CaseType;
  status: CaseStatus;
  name: string;
  ageAtIncident: string;
  currentAge?: string;
  incidentDate: string;
  county: string;
  city: string;
  photoUrl: string;
  gender: 'Female' | 'Male' | 'Other' | 'Unknown';
  height?: string;
  weight?: string;
  hairColor?: string;
  eyeColor?: string;
  identifyingFeatures: string[];
  summary: string;
  fullNarrative: string;
  investigatingAgency: string;
  agencyPhone: string;
  caseNumber: string;
  namusId?: string;
  ncmecId?: string;
  isUrgent?: boolean;
}

export const WNY_COUNTIES = [
  'All Counties',
  'Erie County',
  'Monroe County',
  'Niagara County',
  'Chautauqua County',
  'Cattaraugus County',
  'Allegany County',
  'Genesee County',
  'Orleans County',
  'Wyoming County',
] as const;

// ============================================================================
// WEEKLY CASES DATABASE
// To add a new case, copy the template below and paste it into the casesData array:
//
// {
//   id: "wny-" + Date.now(),
//   type: "Missing Person", // or "Unidentified Person"
//   status: "Active",       // "Active" | "Cold Case" | "Resolved"
//   name: "Person's Name",
//   ageAtIncident: "25",
//   currentAge: "25",
//   incidentDate: "Month DD, YYYY",
//   county: "Erie County",  // Choose from WNY_COUNTIES above
//   city: "Buffalo, NY",
//   photoUrl: "https://your-photo-url-here.jpg",
//   gender: "Female",       // "Female" | "Male" | "Other" | "Unknown"
//   height: "5'6\"",
//   weight: "130 lbs",
//   hairColor: "Brown",
//   eyeColor: "Brown",
//   identifyingFeatures: ["Tattoo on left wrist", "Last seen wearing gray coat"],
//   summary: "Short 1-2 sentence description for the card.",
//   fullNarrative: "Detailed explanation of when and where they were last seen.",
//   investigatingAgency: "Buffalo Police Department",
//   agencyPhone: "(716) 851-4444",
//   caseNumber: "BPD-2024-00000",
//   namusId: "MP12345", // Optional: NamUs ID if available
//   isUrgent: false
// },
// ============================================================================

export const casesData: CaseRecord[] = [];
