export interface TrustScoreBreakdown {
  readonly overall: number;              // 0-100 score (e.g. 92)
  readonly paymentReliability: number;   // e.g. 98
  readonly workforceReliability: number; // e.g. 94
  readonly projectCompletion: number;   // e.g. 91
  readonly professionalism: number;     // e.g. 93
  readonly verificationScore: number;    // e.g. 100
}

export interface Contractor {
  readonly id: string;
  readonly companyName: string;
  readonly contactPerson: string;
  readonly email: string;
  readonly phone: string;
  readonly verified: boolean;
  readonly rating: number;
  readonly completedProjects: number;
  readonly workforceCount: number;
  readonly experienceYears: number;
  readonly specializations: readonly string[];
  readonly location: string;
  readonly trustScore: TrustScoreBreakdown;
  readonly avatarUrl?: string;
  readonly connected?: boolean;
}
