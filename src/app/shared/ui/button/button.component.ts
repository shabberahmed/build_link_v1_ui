import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'accent' | 'outline' | 'danger' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  inverted = input<boolean>(false);

  btnClick = output<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.btnClick.emit(event);
    }
  }
}
