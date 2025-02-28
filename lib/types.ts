export interface Patient {
    id: number;
    name: string;
    number: string;
    consultationFees?: number;
    otherFees?: number;
    notes?: string;
    prescription?: string;
    paymentMode?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Stats {
    totalCollection: number;
    patientCount: number;
    period: "daily" | "weekly" | "monthly" | "yearly";
  }
  
  export type Role = "receptionist" | "doctor";