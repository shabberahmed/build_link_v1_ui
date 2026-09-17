import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  value = input<number>(0); // 0 to 100
  color = input<'primary' | 'available' | 'accent' | 'teal'>('primary');
  height = input<string>('8px');
  showLabel = input<boolean>(false);
}
