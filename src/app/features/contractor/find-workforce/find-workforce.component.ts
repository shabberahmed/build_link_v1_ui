import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketplaceStore } from '../../../state/marketplace.store';
import { WorkforceStore } from '../../../state/workforce.store';
import { ProjectStore } from '../../../state/project.store';
import { NotificationStore } from '../../../state/notification.store';
import { ToastStore } from '../../../state/toast.store';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { Worker, WorkerTrade } from '../../../data-access/models/worker.model';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { AvatarComponent } from '../../../shared/ui/avatar/avatar.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { WorkerCardComponent } from '../../../shared/domain/worker-card/worker-card.component';

export interface MarketplaceMatch {
  id: string;
  contractorName: string;
  contractorAvatar: string;
  matchScore: number;
  trade: WorkerTrade;
  availableCount: number;
  rating: number;
  experienceAvg: number;
  availableDate: string;
  dailyRate: number;
  location: string;
}

@Component({
  selector: 'app-find-workforce',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    CardComponent,
    AvatarComponent,
    ModalComponent,
    BadgeComponent,
    WorkerCardComponent,
    TranslatePipe,
    LocaleLabelPipe
  ],
  templateUrl: './find-workforce.component.html',
  styleUrl: './find-workforce.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindWorkforceComponent {
  readonly marketplaceStore = inject(MarketplaceStore);
  readonly workforceStore = inject(WorkforceStore);
  readonly projectStore = inject(ProjectStore);
  readonly i18n = inject(I18nService);
  private readonly notifications = inject(NotificationStore);
  private readonly toast = inject(ToastStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  selectedMatchForReq = signal<MarketplaceMatch | undefined>(undefined);
  viewingMatch = signal<MarketplaceMatch | undefined>(undefined);
  selectedWorker = signal<Worker | undefined>(undefined);
  assigningWorker = signal<Worker | undefined>(undefined);
  searchTick = signal(0);

  searchForm = this.fb.nonNullable.group({
    trade: ['MASON' as WorkerTrade],
    location: ['Hyderabad'],
    workerCount: [10],
    startDate: ['2026-09-10'],
    durationDays: [20],
    maxRate: [1500]
  });

  readonly matches = computed<MarketplaceMatch[]>(() => {
    this.searchTick();
    const form = this.searchForm.getRawValue();
    const loc = form.location.toLowerCase().trim();

    return this.marketplaceStore.contractors()
      .filter(c => c.id !== 'c-001')
      .map(c => {
        const pool = this.workforceStore.workers().filter(w =>
          (w.contractorId === c.id || w.contractorName === c.companyName) &&
          (form.trade === w.trade) &&
          w.status !== 'ON_LEAVE'
        );
        const fallbackPool = this.workforceStore.workers().filter(w =>
          w.trade === form.trade && w.status === 'AVAILABLE'
        );
        const used = pool.length ? pool : fallbackPool;
        const avgRate = used.length
          ? Math.round(used.reduce((s, w) => s + w.dailyRate, 0) / used.length)
          : 900;
        const avgExp = used.length
          ? Math.round(used.reduce((s, w) => s + w.experienceYears, 0) / used.length)
          : c.experienceYears;
        const availableCount = used.length || Math.max(form.workerCount, Math.floor(c.workforceCount * 0.1));
        const locationMatch = !loc || c.location.toLowerCase().includes(loc) || loc.includes(c.location.toLowerCase());
        let score = 70 + Math.round(c.trustScore.overall / 5);
        if (locationMatch) score += 8;
        if (availableCount >= form.workerCount) score += 6;
        if (avgRate <= form.maxRate) score += 4;
        return {
          id: c.id,
          contractorName: c.companyName,
          contractorAvatar: c.avatarUrl ?? '',
          matchScore: Math.min(99, score),
          trade: form.trade,
          availableCount,
          rating: c.rating,
          experienceAvg: avgExp,
          availableDate: form.startDate,
          dailyRate: avgRate,
          location: c.location
        };
      })
      .filter(m => m.dailyRate <= form.maxRate)
      .sort((a, b) => b.matchScore - a.matchScore);
  });

  viewingWorkers = computed<Worker[]>(() => {
    const match = this.viewingMatch();
    if (!match) return [];
    const byContractor = this.workforceStore.workers().filter(w =>
      w.contractorName === match.contractorName && w.trade === match.trade
    );
    if (byContractor.length) return byContractor;
    return this.workforceStore.workers().filter(w => w.trade === match.trade);
  });

  runSearch(): void {
    this.searchTick.update(n => n + 1);
    const val = this.searchForm.getRawValue();
    this.marketplaceStore.filters.set({
      trade: val.trade,
      location: val.location,
      minWorkers: val.workerCount,
      maxDailyRate: val.maxRate,
      accommodationRequired: false
    });
  }

  openWorkforce(match: MarketplaceMatch): void {
    this.viewingMatch.set(match);
  }

  closeWorkforce(): void {
    this.viewingMatch.set(undefined);
    this.selectedWorker.set(undefined);
    this.assigningWorker.set(undefined);
  }

  openWorkerDetail(worker: Worker): void {
    this.selectedWorker.set(worker);
  }

  closeWorkerDetail(): void {
    this.selectedWorker.set(undefined);
  }

  openAssign(worker: Worker): void {
    this.assigningWorker.set(worker);
  }

  closeAssign(): void {
    this.assigningWorker.set(undefined);
  }

  confirmAssign(projectId: string): void {
    const worker = this.assigningWorker();
    const match = this.viewingMatch();
    const project = this.projectStore.projects().find(p => p.id === projectId);
    if (!worker || !project) return;

    this.workforceStore.assignWorkerToProject(worker.id, project.id, project.name);
    this.projectStore.incrementDeployedWorkers(project.id, 1);

    if (match) {
      this.marketplaceStore.submitRequest({
        targetContractorId: match.id,
        targetContractorName: match.contractorName,
        trade: worker.trade,
        workerCount: 1,
        location: this.searchForm.getRawValue().location || match.location,
        startDate: this.searchForm.getRawValue().startDate,
        durationDays: this.searchForm.getRawValue().durationDays,
        dailyRate: worker.dailyRate,
        accommodationProvided: true,
        transportProvided: true,
        notes: `Requested ${worker.name} for ${project.name}`
      });
    }

    this.notifications.addNotification({
      title: this.i18n.t('notif.workerRequested'),
      message: this.i18n.t('notif.workerAssignedBody', { name: worker.name, project: project.name }),
      category: 'REQUEST',
      actionUrl: '/contractor/projects'
    });
    this.toast.show(this.i18n.t('toast.assignedTo', { name: worker.name, project: project.name }));
    this.closeAssign();
    this.closeWorkerDetail();
  }

  openRequestModal(match: MarketplaceMatch): void {
    this.selectedMatchForReq.set(match);
  }

  closeRequestModal(): void {
    this.selectedMatchForReq.set(undefined);
  }

  sendQuickRequest(): void {
    const match = this.selectedMatchForReq();
    if (!match) return;
    const form = this.searchForm.getRawValue();

    this.marketplaceStore.submitRequest({
      targetContractorId: match.id,
      targetContractorName: match.contractorName,
      trade: match.trade,
      workerCount: form.workerCount,
      location: form.location || match.location,
      startDate: form.startDate,
      durationDays: form.durationDays,
      dailyRate: match.dailyRate,
      accommodationProvided: true,
      transportProvided: true,
      notes: 'Workforce request generated via BuildLink Marketplace'
    });

    this.notifications.addNotification({
      title: this.i18n.t('notif.requestSent'),
      message: this.i18n.t('notif.requestSentBody', {
        count: form.workerCount,
        trade: this.i18n.label('trade', match.trade),
        contractor: match.contractorName
      }),
      category: 'REQUEST',
      actionUrl: '/contractor/requests'
    });

    this.closeRequestModal();
    this.router.navigate(['/contractor/requests']);
  }
}
