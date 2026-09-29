export interface TechnicianApplicationData {
  user: {
    name: string;
    email: string;
  };
  technician: {
    address?: string;
    experienceYears: number;
    bio?: string;
    contactNumber?: string;
  };
}

export interface TechnicianApplicationPayload {
  resume: File;
  data: TechnicianApplicationData;
}

export interface UpdateTechnicianProfilePayload {
  address?: string;
  bio?: string;
  contactNumber?: string;
  experienceYears?: number;
}