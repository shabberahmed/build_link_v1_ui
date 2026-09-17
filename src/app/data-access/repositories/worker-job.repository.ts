import { Observable } from 'rxjs';
import { Worker } from '../models/worker.model';
import { AttendanceRecord } from '../models/attendance.model';
import { PaymentRecord } from '../models/payment.model';
import { WorkforceRequest } from '../models/request.model';

export abstract class WorkerJobRepository {
  abstract getWorkerProfile(id: string): Observable<Worker | undefined>;
  abstract getAttendanceHistory(workerId: string): Observable<AttendanceRecord[]>;
  abstract getEarningsHistory(workerId: string): Observable<PaymentRecord[]>;
  abstract getAvailableOpportunities(): Observable<WorkforceRequest[]>;
  abstract punchAttendance(workerId: string, status: AttendanceRecord['status']): Observable<AttendanceRecord>;
  abstract toggleAvailability(workerId: string, status: Worker['status']): Observable<Worker>;
  abstract applyToJob(jobId: string, workerId: string): Observable<{ success: boolean; jobId: string }>;
}
