import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  title = input<string>('');
  value = input<string | number>('');
  subtext = input<string | undefined>();
  accent = input<'primary' | 'available' | 'deployed' | 'amber' | 'purple'>('primary');
  icon = input<string | undefined>();
}
