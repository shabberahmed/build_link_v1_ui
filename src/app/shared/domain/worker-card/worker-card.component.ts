import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { Worker } from '../../../data-access/models/worker.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { AvatarComponent } from '../../ui/avatar/avatar.component';
import { BadgeComponent } from '../../ui/badge/badge.component';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-worker-card',
  standalone: true,
  imports: [AvatarComponent, BadgeComponent, ButtonComponent, TranslatePipe, LocaleLabelPipe],
  templateUrl: './worker-card.component.html',
  styleUrl: './worker-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerCardComponent {
  readonly i18n = inject(I18nService);
  worker = input.required<Worker>();
  assignClick = output<Worker>();
  viewClick = output<Worker>();

  get badgeVariant(): 'available' | 'deployed' | 'on-leave' | 'coming-soon' | 'unavailable' {
    switch (this.worker().status) {
      case 'AVAILABLE': return 'available';
      case 'DEPLOYED': return 'deployed';
      case 'ON_LEAVE': return 'on-leave';
      case 'COMING_AVAILABLE': return 'coming-soon';
      default: return 'unavailable';
    }
  }
}
