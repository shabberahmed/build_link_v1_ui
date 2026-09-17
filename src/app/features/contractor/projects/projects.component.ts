import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectStore } from '../../../state/project.store';
import { NotificationStore } from '../../../state/notification.store';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ProgressBarComponent } from '../../../shared/ui/progress-bar/progress-bar.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent, BadgeComponent, ProgressBarComponent, ButtonComponent, ModalComponent, TranslatePipe, LocaleLabelPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  readonly projectStore = inject(ProjectStore);
  readonly i18n = inject(I18nService);
  private readonly notifications = inject(NotificationStore);
  private readonly fb = inject(FormBuilder);

  isCreateOpen = signal(false);

  createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    location: ['Hyderabad', Validators.required],
    clientName: ['', Validators.required],
    startDate: [new Date().toISOString().split('T')[0], Validators.required],
    endDate: ['2026-12-31', Validators.required],
    requiredWorkers: [12, [Validators.required, Validators.min(1)]]
  });

  openCreate(): void {
    this.isCreateOpen.set(true);
  }

  closeCreate(): void {
    this.isCreateOpen.set(false);
  }

  submitCreate(): void {
    if (this.createForm.invalid) return;
    const val = this.createForm.getRawValue();
    this.projectStore.createProject(val);
    this.notifications.addNotification({
      title: this.i18n.t('notif.projectCreated'),
      message: this.i18n.t('notif.projectCreatedBody', { name: val.name }),
      category: 'PROJECT',
      actionUrl: '/contractor/projects'
    });
    this.createForm.reset({
      name: '',
      location: 'Hyderabad',
      clientName: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      requiredWorkers: 12
    });
    this.closeCreate();
  }
}
