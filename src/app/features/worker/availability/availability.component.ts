import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WorkerAppStore } from '../../../state/worker-app.store';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { WorkerStatus } from '../../../data-access/models/worker.model';

@Component({
  selector: 'app-worker-availability',
  standalone: true,
  imports: [CardComponent, ButtonComponent, TranslatePipe, LocaleLabelPipe],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerAvailabilityComponent {
  readonly store = inject(WorkerAppStore);

  set(status: WorkerStatus): void {
    this.store.setAvailability(status);
  }
}
