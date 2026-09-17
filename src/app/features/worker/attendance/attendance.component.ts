import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WorkerAppStore } from '../../../state/worker-app.store';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';

@Component({
  selector: 'app-worker-attendance',
  standalone: true,
  imports: [CardComponent, BadgeComponent, TranslatePipe, LocaleLabelPipe],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerAttendanceComponent {
  readonly store = inject(WorkerAppStore);
  readonly i18n = inject(I18nService);
}
