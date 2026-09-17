import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { LanguageSwitcherComponent } from '../../shared/ui/language-switcher/language-switcher.component';
import { NotificationStore } from '../../state/notification.store';

@Component({
  selector: 'app-contractor-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AvatarComponent, ButtonComponent, LanguageSwitcherComponent, TranslatePipe],
  templateUrl: './contractor-shell.component.html',
  styleUrl: './contractor-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorShellComponent {
  readonly authService = inject(AuthService);
  readonly notificationStore = inject(NotificationStore);
  private readonly i18n = inject(I18nService);
  private readonly router = inject(Router);

  isMobileMenuOpen = signal<boolean>(false);

  readonly todayLabel = computed(() =>
    new Intl.DateTimeFormat(this.i18n.dateLocale(), {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date())
  );

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  switchToWorkerRole(): void {
    this.authService.switchRole('WORKER');
    this.router.navigate(['/worker/dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
