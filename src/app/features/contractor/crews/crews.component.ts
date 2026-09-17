import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkforceStore } from '../../../state/workforce.store';
import { NotificationStore } from '../../../state/notification.store';
import { ToastStore } from '../../../state/toast.store';
import { Crew } from '../../../data-access/models/crew.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { CrewCardComponent } from '../../../shared/domain/crew-card/crew-card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';

@Component({
  selector: 'app-crews',
  standalone: true,
  imports: [ReactiveFormsModule, CrewCardComponent, ButtonComponent, ModalComponent, TranslatePipe],
  templateUrl: './crews.component.html',
  styleUrl: './crews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewsComponent {
  readonly workforceStore = inject(WorkforceStore);
  readonly i18n = inject(I18nService);
  private readonly notifications = inject(NotificationStore);
  private readonly toast = inject(ToastStore);
  private readonly fb = inject(FormBuilder);

  isAssembleOpen = signal(false);
  requestingCrew = signal<Crew | undefined>(undefined);

  assembleForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    location: ['Hyderabad', Validators.required],
    dailyRatePerWorker: [900, [Validators.required, Validators.min(100)]],
    availableFrom: [new Date().toISOString().split('T')[0], Validators.required],
    supervisorName: ['Suresh Reddy'],
    compositionNotes: ['MASON:6, HELPER:3'],
    memberIds: ['']
  });

  requestForm = this.fb.nonNullable.group({
    startDate: [new Date().toISOString().split('T')[0], Validators.required],
    durationDays: [14, [Validators.required, Validators.min(1)]],
    notes: ['Need a full crew for slab work.']
  });

  openAssemble(): void {
    this.isAssembleOpen.set(true);
  }

  closeAssemble(): void {
    this.isAssembleOpen.set(false);
  }

  submitAssemble(): void {
    if (this.assembleForm.invalid) return;
    const val = this.assembleForm.getRawValue();
    const memberWorkerIds = val.memberIds
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    this.workforceStore.createCrew({
      name: val.name,
      location: val.location,
      dailyRatePerWorker: val.dailyRatePerWorker,
      availableFrom: val.availableFrom,
      compositionNotes: val.compositionNotes,
      supervisorName: val.supervisorName,
      memberWorkerIds
    });

    this.notifications.addNotification({
      title: this.i18n.t('notif.crewAssembled'),
      message: this.i18n.t('notif.crewAssembledBody', { name: val.name }),
      category: 'PROJECT',
      actionUrl: '/contractor/crews'
    });

    this.closeAssemble();
    this.toast.show(this.i18n.t('toast.crewListed'));
  }

  openRequest(crew: Crew): void {
    this.requestingCrew.set(crew);
  }

  closeRequest(): void {
    this.requestingCrew.set(undefined);
  }

  submitRequest(): void {
    const crew = this.requestingCrew();
    if (!crew || this.requestForm.invalid) return;
    const val = this.requestForm.getRawValue();
    this.workforceStore.requestCrew({
      crewId: crew.id,
      startDate: val.startDate,
      durationDays: val.durationDays,
      notes: val.notes
    });
    this.notifications.addNotification({
      title: this.i18n.t('notif.crewRequestSent'),
      message: this.i18n.t('notif.crewRequestSentBody', { name: crew.name, days: val.durationDays, date: val.startDate }),
      category: 'REQUEST',
      actionUrl: '/contractor/requests'
    });
    this.closeRequest();
    this.toast.show(this.i18n.t('toast.crewRequest'));
  }

  dismissSuccess(): void {
    this.workforceStore.clearCrewRequestSuccess();
  }
}
