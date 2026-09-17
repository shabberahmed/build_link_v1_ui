import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarketplaceStore } from '../../../state/marketplace.store';
import { WorkforceStore } from '../../../state/workforce.store';
import { ProjectStore } from '../../../state/project.store';
import { NotificationStore } from '../../../state/notification.store';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { StepperComponent, StepItem } from '../../../shared/ui/stepper/stepper.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StepperComponent,
    ButtonComponent,
    CardComponent,
    BadgeComponent,
    TranslatePipe,
    LocaleLabelPipe
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsComponent {
  readonly store = inject(MarketplaceStore);
  readonly workforceStore = inject(WorkforceStore);
  readonly projectStore = inject(ProjectStore);
  readonly i18n = inject(I18nService);
  private readonly notifications = inject(NotificationStore);
  private readonly fb = inject(FormBuilder);

  activeTab = signal<'INBOUND' | 'CREATE'>('INBOUND');
  currentStep = signal<number>(1);

  readonly stepsList = computed<StepItem[]>(() => [
    { number: 1, label: this.i18n.t('orders.stepReq') },
    { number: 2, label: this.i18n.t('orders.stepDetails') },
    { number: 3, label: this.i18n.t('orders.stepTerms') },
    { number: 4, label: this.i18n.t('orders.stepReview') }
  ]);

  wizardForm = this.fb.nonNullable.group({
    trade: ['MASON'],
    workerCount: [10, [Validators.required, Validators.min(1)]],
    location: ['Hyderabad (Financial District)', Validators.required],
    startDate: ['2026-09-10', Validators.required],
    endDate: ['2026-09-30', Validators.required],
    durationDays: [20],
    dailyRate: [950, [Validators.required, Validators.min(100)]],
    accommodationProvided: [true],
    transportProvided: [true],
    shiftType: ['DAY'],
    notes: ['Required for urgent RCC masonry slab work.']
  });

  nextStep(): void {
    if (this.currentStep() === 2) {
      const start = new Date(this.wizardForm.controls.startDate.value);
      const end = new Date(this.wizardForm.controls.endDate.value);
      const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
      this.wizardForm.controls.durationDays.setValue(days);
    }
    if (this.currentStep() < 4) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  submitWizard(): void {
    const val = this.wizardForm.getRawValue();
    this.store.submitRequest({
      targetContractorName: 'Sri Sai Infra',
      trade: val.trade as any,
      workerCount: val.workerCount,
      location: val.location,
      startDate: val.startDate,
      endDate: val.endDate,
      durationDays: val.durationDays,
      dailyRate: val.dailyRate,
      accommodationProvided: val.accommodationProvided,
      transportProvided: val.transportProvided,
      shiftType: val.shiftType as any,
      notes: val.notes
    });

    this.notifications.addNotification({
      title: this.i18n.t('notif.orderSubmitted'),
      message: this.i18n.t('notif.orderSubmittedBody', {
        count: val.workerCount,
        trade: this.i18n.label('trade', val.trade),
        date: val.startDate
      }),
      category: 'REQUEST',
      actionUrl: '/contractor/requests'
    });

    this.currentStep.set(1);
    this.activeTab.set('INBOUND');
  }

  acceptRequest(id: string): void {
    const req = this.store.requests().find(r => r.id === id);
    this.store.respondToRequest(id, 'ACCEPTED');
    if (!req) return;

    const project = this.projectStore.activeProjects()[0] ?? this.projectStore.projects()[0];
    const candidates = this.workforceStore.workers()
      .filter(w => w.trade === req.trade && w.status === 'AVAILABLE')
      .slice(0, req.workerCount);

    for (const worker of candidates) {
      if (project) {
        this.workforceStore.assignWorkerToProject(worker.id, project.id, project.name);
      }
    }
    if (project && candidates.length) {
      this.projectStore.incrementDeployedWorkers(project.id, candidates.length);
    }

    this.notifications.addNotification({
      title: this.i18n.t('notif.requestAccepted'),
      message: candidates.length
        ? this.i18n.t('notif.requestAcceptedBody', {
            count: candidates.length,
            trade: this.i18n.label('trade', req.trade),
            project: project?.name ?? ''
          })
        : this.i18n.t('notif.requestAcceptedNone', { trade: this.i18n.label('trade', req.trade) }),
      category: 'REQUEST',
      actionUrl: '/contractor/projects'
    });
  }

  rejectRequest(id: string): void {
    this.store.respondToRequest(id, 'REJECTED');
  }
}
