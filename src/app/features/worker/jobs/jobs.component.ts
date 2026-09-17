import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WorkerAppStore } from '../../../state/worker-app.store';
import { ToastStore } from '../../../state/toast.store';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-worker-jobs',
  standalone: true,
  imports: [CardComponent, ButtonComponent, BadgeComponent, TranslatePipe, LocaleLabelPipe],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerJobsComponent {
  readonly store = inject(WorkerAppStore);
  private readonly toast = inject(ToastStore);
  private readonly i18n = inject(I18nService);

  apply(jobId: string): void {
    this.store.applyToJob(jobId);
    this.toast.show(this.i18n.t('toast.applied'));
  }
}
