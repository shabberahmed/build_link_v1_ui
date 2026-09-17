export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'OVERTIME';

export interface AttendanceRecord {
  readonly id: string;
  readonly workerId: string;
  readonly workerName: string;
  readonly projectId: string;
  readonly projectName: string;
  readonly date: string;
  readonly status: AttendanceStatus;
  readonly checkInTime?: string;
  readonly checkOutTime?: string;
  readonly hoursWorked: number;
  readonly dailyWagesEarned: number;
}
