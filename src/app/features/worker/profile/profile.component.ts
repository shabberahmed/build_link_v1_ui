import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkerAppStore } from '../../../state/worker-app.store';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { AvatarComponent } from '../../../shared/ui/avatar/avatar.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CardComponent, AvatarComponent, RouterLink, ButtonComponent, TranslatePipe, LocaleLabelPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerProfileComponent {
  readonly store = inject(WorkerAppStore);
  readonly i18n = inject(I18nService);
}
