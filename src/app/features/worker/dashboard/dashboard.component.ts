import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkerAppStore } from '../../../state/worker-app.store';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-worker-dashboard',
  standalone: true,
  imports: [RouterLink, ButtonComponent, BadgeComponent, TranslatePipe, LocaleLabelPipe, LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerDashboardComponent {
  readonly store = inject(WorkerAppStore);
  readonly i18n = inject(I18nService);

  punch(status: 'PRESENT' | 'HALF_DAY' | 'OVERTIME'): void {
    this.store.punchAttendance(status);
  }

  apply(jobId: string): void {
    this.store.applyToJob(jobId);
  }
}
