export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly clientName: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly requiredWorkers: number;
  readonly deployedWorkers: number;
  readonly status: ProjectStatus;
  readonly progressPercentage: number;
  readonly assignedCrewNames: readonly string[];
}
