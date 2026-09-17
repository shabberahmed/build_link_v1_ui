import { WorkerTrade } from './worker.model';

export interface CrewComposition {
  readonly trade: WorkerTrade;
  readonly count: number;
}

export interface Crew {
  readonly id: string;
  readonly name: string;
  readonly contractorId: string;
  readonly contractorName: string;
  readonly supervisorName: string;
  readonly totalWorkers: number;
  readonly composition: readonly CrewComposition[];
  readonly averageRating: number;
  readonly dailyRatePerWorker: number;
  readonly availableFrom: string; // ISO date YYYY-MM-DD
  readonly location: string;
  readonly status: 'AVAILABLE' | 'DEPLOYED' | 'COMING_AVAILABLE';
  readonly currentProjectName?: string;
  readonly memberWorkerIds: readonly string[];
}
