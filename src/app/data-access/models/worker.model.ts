export type WorkerTrade = 
  | 'MASON' 
  | 'HELPER' 
  | 'ELECTRICIAN' 
  | 'PLUMBER' 
  | 'CARPENTER' 
  | 'PAINTER' 
  | 'WELDER' 
  | 'SUPERVISOR' 
  | 'SHUTTERING';

export type WorkerStatus = 
  | 'AVAILABLE' 
  | 'DEPLOYED' 
  | 'ON_LEAVE' 
  | 'UNAVAILABLE' 
  | 'COMING_AVAILABLE';

export interface WorkerSkill {
  readonly name: string;
  readonly level: 'BASIC' | 'INTERMEDIATE' | 'EXPERT';
}

export interface Worker {
  readonly id: string;
  readonly name: string;
  readonly trade: WorkerTrade;
  readonly secondarySkills: readonly string[];
  readonly experienceYears: number;
  readonly rating: number;
  readonly dailyRate: number;
  readonly status: WorkerStatus;
  readonly availableDate: string; // ISO date string YYYY-MM-DD
  readonly location: string;
  readonly phone: string;
  readonly avatar: string;
  readonly contractorId: string;
  readonly contractorName?: string;
  readonly currentProjectId?: string;
  readonly currentProjectName?: string;
  readonly attendanceRate: number; // e.g. 96 for 96%
  readonly retentionRate: number;  // e.g. 91 for 91%
  readonly completedProjectsCount: number;
  readonly bio?: string;
}

export interface CreateWorkerDto {
  readonly name: string;
  readonly trade: WorkerTrade;
  readonly experienceYears: number;
  readonly dailyRate: number;
  readonly location: string;
  readonly phone: string;
  readonly secondarySkills: string[];
}
