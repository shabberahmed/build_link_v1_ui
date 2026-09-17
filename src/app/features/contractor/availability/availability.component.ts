import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { WorkforceStore } from '../../../state/workforce.store';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { WorkerTrade } from '../../../data-access/models/worker.model';

export type CalendarViewMode = 'DAILY' | 'WEEKLY' | 'MONTHLY';

interface TimelineRow {
  trade: WorkerTrade;
  total: number;
  deployed: number;
  available: number;
  leave: number;
  sampleNames: string;
}

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CardComponent, ButtonComponent, TranslatePipe, LocaleLabelPipe],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailabilityComponent {
  private readonly workforceStore = inject(WorkforceStore);
  viewMode = signal<CalendarViewMode>('WEEKLY');

  readonly headers = computed(() => {
    switch (this.viewMode()) {
      case 'DAILY':
        return ['Mon 14', 'Tue 15', 'Wed 16', 'Thu 17', 'Fri 18'];
      case 'MONTHLY':
        return ['Sep', 'Oct', 'Nov', 'Dec'];
      default:
        return ['Sept 1 - Sept 7', 'Sept 8 - Sept 14', 'Sept 15 - Sept 21', 'Sept 22 - Sept 30'];
    }
  });

  readonly rows = computed<TimelineRow[]>(() => {
    const grouped = new Map<WorkerTrade, TimelineRow>();
    for (const w of this.workforceStore.workers()) {
      const existing = grouped.get(w.trade) ?? {
        trade: w.trade,
        total: 0,
        deployed: 0,
        available: 0,
        leave: 0,
        sampleNames: ''
      };
      existing.total += 1;
      if (w.status === 'DEPLOYED') existing.deployed += 1;
      else if (w.status === 'ON_LEAVE' || w.status === 'UNAVAILABLE') existing.leave += 1;
      else existing.available += 1;
      if (!existing.sampleNames) existing.sampleNames = w.name;
      grouped.set(w.trade, existing);
    }
    return [...grouped.values()].sort((a, b) => b.total - a.total);
  });

  pct(part: number, total: number): number {
    if (!total) return 0;
    return Math.max(8, Math.round((part / total) * 100));
  }

  setViewMode(mode: CalendarViewMode): void {
    this.viewMode.set(mode);
  }
}
