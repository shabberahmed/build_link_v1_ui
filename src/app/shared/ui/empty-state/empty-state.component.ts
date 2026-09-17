import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  title = input<string>('No data found');
  description = input<string>('');
  icon = input<string>('🏗️');
}
