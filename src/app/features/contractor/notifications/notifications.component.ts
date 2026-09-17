import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { NotificationStore } from '../../../state/notification.store';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { AppNotification } from '../../../data-access/models/notification.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CardComponent, ButtonComponent, TranslatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {
  readonly store = inject(NotificationStore);
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);

  openNotification(n: AppNotification): void {
    this.store.markAsRead(n.id);
    if (n.actionUrl) {
      this.router.navigateByUrl(n.actionUrl);
    }
  }
}
