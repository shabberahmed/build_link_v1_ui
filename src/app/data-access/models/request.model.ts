import { WorkerTrade } from './worker.model';

export type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

export interface WorkforceRequest {
  readonly id: string;
  readonly requesterContractorId: string;
  readonly requesterContractorName: string;
  readonly targetContractorId: string;
  readonly targetContractorName: string;
  readonly trade: WorkerTrade;
  readonly workerCount: number;
  readonly location: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly durationDays: number;
  readonly dailyRate: number;
  readonly accommodationProvided: boolean;
  readonly transportProvided: boolean;
  readonly shiftType: 'DAY' | 'NIGHT' | 'ROTATING';
  readonly notes?: string;
  readonly status: RequestStatus;
  readonly createdAt: string;
  readonly matchScore?: number;
}
