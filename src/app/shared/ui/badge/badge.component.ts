import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  variant = input<'available' | 'deployed' | 'on-leave' | 'coming-soon' | 'unavailable' | 'neutral' | 'accent'>('neutral');
  size = input<'sm' | 'md'>('md');
}
