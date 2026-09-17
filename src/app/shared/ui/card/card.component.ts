import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
  clickable = input<boolean>(false);
}
