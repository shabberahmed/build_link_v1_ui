import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkforceStore } from '../../../state/workforce.store';
import { ProjectStore } from '../../../state/project.store';
import { NotificationStore } from '../../../state/notification.store';
import { Worker, WorkerTrade, WorkerStatus } from '../../../data-access/models/worker.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { WorkerCardComponent } from '../../../shared/domain/worker-card/worker-card.component';
import { SearchInputComponent } from '../../../shared/ui/search-input/search-input.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-workforce',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    WorkerCardComponent,
    SearchInputComponent,
    ButtonComponent,
    ModalComponent,
    BadgeComponent,
    TranslatePipe,
    LocaleLabelPipe
  ],
  templateUrl: './workforce.component.html',
  styleUrl: './workforce.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkforceComponent {
  readonly workforceStore = inject(WorkforceStore);
  readonly projectStore = inject(ProjectStore);
  readonly i18n = inject(I18nService);
  private readonly notifications = inject(NotificationStore);
  private readonly fb = inject(FormBuilder);

  selectedWorker = signal<Worker | undefined>(undefined);
  assigningWorker = signal<Worker | undefined>(undefined);
  isAddModalOpen = signal<boolean>(false);

  readonly tradesList: (WorkerTrade | 'ALL')[] = [
    'ALL', 'MASON', 'SUPERVISOR', 'ELECTRICIAN', 'PLUMBER', 'CARPENTER', 'PAINTER', 'WELDER', 'SHUTTERING', 'HELPER'
  ];

  readonly statusList: (WorkerStatus | 'ALL')[] = [
    'ALL', 'AVAILABLE', 'DEPLOYED', 'ON_LEAVE', 'COMING_AVAILABLE'
  ];

  addWorkerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    trade: ['MASON' as WorkerTrade, Validators.required],
    experienceYears: [5, [Validators.required, Validators.min(0)]],
    dailyRate: [900, [Validators.required, Validators.min(100)]],
    location: ['Hyderabad', Validators.required],
    phone: ['+91 98490 00000', Validators.required],
    secondarySkills: ['Plastering, Tile Work']
  });

  onSearch(query: string): void {
    this.workforceStore.searchQuery.set(query);
  }

  selectTrade(trade: WorkerTrade | 'ALL'): void {
    this.workforceStore.selectedTrade.set(trade);
  }

  selectStatus(status: WorkerStatus | 'ALL'): void {
    this.workforceStore.selectedStatus.set(status);
  }

  openAddModal(): void {
    this.isAddModalOpen.set(true);
  }

  closeAddModal(): void {
    this.isAddModalOpen.set(false);
  }

  onAddWorkerSubmit(): void {
    if (this.addWorkerForm.invalid) return;

    const val = this.addWorkerForm.getRawValue();
    this.workforceStore.addWorker({
      name: val.name,
      trade: val.trade,
      experienceYears: val.experienceYears,
      dailyRate: val.dailyRate,
      location: val.location,
      phone: val.phone,
      secondarySkills: val.secondarySkills.split(',').map(s => s.trim())
    });

    this.addWorkerForm.reset();
    this.closeAddModal();
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
    const project = this.projectStore.projects().find(p => p.id === projectId);
    if (!worker || !project) return;

    this.workforceStore.assignWorkerToProject(worker.id, project.id, project.name);
    this.projectStore.incrementDeployedWorkers(project.id, 1);
    this.notifications.addNotification({
      title: this.i18n.t('notif.workerAssigned'),
      message: this.i18n.t('notif.workerAssignedBody', { name: worker.name, project: project.name }),
      category: 'PROJECT',
      actionUrl: '/contractor/projects'
    });
    this.closeAssign();
    this.closeWorkerDetail();
  }
}
