import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { LanguageSwitcherComponent } from '../../shared/ui/language-switcher/language-switcher.component';

@Component({
  selector: 'app-worker-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonComponent, LanguageSwitcherComponent, TranslatePipe],
  templateUrl: './worker-shell.component.html',
  styleUrl: './worker-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerShellComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  switchToContractorRole(): void {
    this.authService.switchRole('CONTRACTOR');
    this.router.navigate(['/contractor/dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
