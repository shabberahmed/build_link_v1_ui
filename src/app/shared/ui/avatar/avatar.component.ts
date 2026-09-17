import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  src = input<string | undefined>();
  name = input<string>('');
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  round = input<boolean>(false);
  broken = signal(false);

  get initials(): string {
    const n = this.name().trim();
    if (!n) return 'U';
    const parts = n.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return n.substring(0, 2).toUpperCase();
  }
}
