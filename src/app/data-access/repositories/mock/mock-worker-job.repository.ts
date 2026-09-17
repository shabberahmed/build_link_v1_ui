import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { WorkerJobRepository } from '../worker-job.repository';
import { Worker } from '../../models/worker.model';
import { AttendanceRecord } from '../../models/attendance.model';
import { PaymentRecord } from '../../models/payment.model';
import { WorkforceRequest } from '../../models/request.model';
import { MOCK_WORKERS, MOCK_ATTENDANCE, MOCK_PAYMENTS, MOCK_REQUESTS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class MockWorkerJobRepository extends WorkerJobRepository {
  private workers: Worker[] = [...MOCK_WORKERS];
  private attendance: AttendanceRecord[] = [...MOCK_ATTENDANCE];

  getWorkerProfile(id: string): Observable<Worker | undefined> {
    const worker = this.workers.find(w => w.id === id) || this.workers[0];
    return of({ ...worker }).pipe(delay(150));
  }

  getAttendanceHistory(workerId: string): Observable<AttendanceRecord[]> {
    const records = this.attendance.filter(a => a.workerId === workerId || true); // mock return
    return of(records).pipe(delay(200));
  }

  getEarningsHistory(workerId: string): Observable<PaymentRecord[]> {
    return of(MOCK_PAYMENTS.filter(p => p.role === 'WORKER')).pipe(delay(200));
  }

  getAvailableOpportunities(): Observable<WorkforceRequest[]> {
    return of(MOCK_REQUESTS).pipe(delay(200));
  }

  punchAttendance(workerId: string, status: AttendanceRecord['status']): Observable<AttendanceRecord> {
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      workerId,
      workerName: 'Ravi Kumar',
      projectId: 'p-101',
      projectName: 'Commercial Tower A',
      date: new Date().toISOString().split('T')[0],
      status,
      checkInTime: '08:00 AM',
      hoursWorked: status === 'HALF_DAY' ? 4.5 : status === 'OVERTIME' ? 11 : 8,
      dailyWagesEarned: status === 'HALF_DAY' ? 450 : status === 'OVERTIME' ? 1350 : 900
    };
    this.attendance = [newRecord, ...this.attendance];
    return of(newRecord).pipe(delay(250));
  }

  toggleAvailability(workerId: string, status: Worker['status']): Observable<Worker> {
    this.workers = this.workers.map(w => w.id === workerId ? { ...w, status } : w);
    const updated = this.workers.find(w => w.id === workerId)!;
    return of(updated).pipe(delay(150));
  }

  applyToJob(jobId: string, workerId: string): Observable<{ success: boolean; jobId: string }> {
    const worker = this.workers.find(w => w.id === workerId);
    if (worker) {
      this.workers = this.workers.map(w =>
        w.id === workerId ? { ...w, status: 'COMING_AVAILABLE' as const } : w
      );
    }
    return of({ success: true, jobId }).pipe(delay(250));
  }
}
