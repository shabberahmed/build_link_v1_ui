import { Injectable, inject, signal, computed } from '@angular/core';
import { WorkerJobRepository } from '../data-access/repositories/worker-job.repository';
import { Worker } from '../data-access/models/worker.model';
import { AttendanceRecord } from '../data-access/models/attendance.model';
import { PaymentRecord } from '../data-access/models/payment.model';
import { WorkforceRequest } from '../data-access/models/request.model';
import { I18nService } from '../core/i18n/i18n.service';

@Injectable({ providedIn: 'root' })
export class WorkerAppStore {
  private readonly repo = inject(WorkerJobRepository);
  private readonly i18n = inject(I18nService);

  private readonly _profile = signal<Worker | undefined>(undefined);
  private readonly _attendance = signal<AttendanceRecord[]>([]);
  private readonly _earnings = signal<PaymentRecord[]>([]);
  private readonly _jobs = signal<WorkforceRequest[]>([]);
  private readonly _appliedJobIds = signal<string[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _applyMessage = signal<string | null>(null);

  readonly profile = this._profile.asReadonly();
  readonly attendance = this._attendance.asReadonly();
  readonly earnings = this._earnings.asReadonly();
  readonly jobs = this._jobs.asReadonly();
  readonly appliedJobIds = this._appliedJobIds.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly applyMessage = this._applyMessage.asReadonly();

  readonly totalEarningsMonth = computed(() =>
    this._earnings().reduce((sum, p) => sum + p.amount, 0)
  );

  readonly daysWorkedMonth = computed(() =>
    this._attendance().filter(a => a.status === 'PRESENT' || a.status === 'OVERTIME').length
  );

  constructor() {
    this.loadWorkerData('w-101');
  }

  loadWorkerData(workerId: string): void {
    this._loading.set(true);
    this.repo.getWorkerProfile(workerId).subscribe(p => this._profile.set(p));
    this.repo.getAttendanceHistory(workerId).subscribe(list => this._attendance.set(list));
    this.repo.getEarningsHistory(workerId).subscribe(list => this._earnings.set(list));
    this.repo.getAvailableOpportunities().subscribe(list => {
      this._jobs.set(list);
      this._loading.set(false);
    });
  }

  punchAttendance(status: AttendanceRecord['status']): void {
    const w = this._profile();
    if (!w) return;
    this.repo.punchAttendance(w.id, status).subscribe(rec => {
      this._attendance.update(prev => [rec, ...prev]);
    });
  }

  setAvailability(status: Worker['status']): void {
    const w = this._profile();
    if (!w) return;
    this.repo.toggleAvailability(w.id, status).subscribe(updated => {
      this._profile.set(updated);
    });
  }

  hasApplied(jobId: string): boolean {
    return this._appliedJobIds().includes(jobId);
  }

  applyToJob(jobId: string): void {
    const w = this._profile();
    if (!w || this.hasApplied(jobId)) return;
    this.repo.applyToJob(jobId, w.id).subscribe(result => {
      if (result.success) {
        this._appliedJobIds.update(ids => [...ids, result.jobId]);
        const job = this._jobs().find(j => j.id === jobId);
        this._applyMessage.set(this.i18n.t('toast.appliedJob', {
          trade: this.i18n.label('trade', job?.trade ?? ''),
          contractor: job?.requesterContractorName ?? ''
        }));
      }
    });
  }

  clearApplyMessage(): void {
    this._applyMessage.set(null);
  }
}
