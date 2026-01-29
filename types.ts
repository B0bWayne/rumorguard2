
export enum RumorStatus {
  HARMFUL = 'harmful',
  UNCLEAR = 'unclear',
  VERIFIED = 'verified'
}

export enum RumorCategory {
  VACCINES = 'Vaccines',
  HIV = 'HIV',
  MALARIA = 'Malaria',
  PREGNANCY = 'Pregnancy',
  MENTAL_HEALTH = 'Mental Health',
  NCDS = 'NCDs',
  OTHER = 'Other'
}

export enum ReportSource {
  APP = 'App',
  SMS = 'SMS',
  SOCIAL = 'Social Media'
}

export interface RumorReport {
  id: string;
  content: string;
  category: RumorCategory;
  location: string;
  status: RumorStatus;
  source: ReportSource;
  timestamp: string;
  riskScore: number; // 0-100
  isVerified: boolean;
  explainer?: string;
  district: string;
}

export interface VHTStats {
  id: string;
  name: string;
  district: string;
  parish: string;
  points: number;
  reportsCount: number;
}
