import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { LanguageSwitcherComponent } from '../../../shared/ui/language-switcher/language-switcher.component';
import { LoaderStore } from '../../../state/loader.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ModalComponent, ButtonComponent, LanguageSwitcherComponent, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);
  private readonly loader = inject(LoaderStore);

  selectedRole = signal<'CONTRACTOR' | 'WORKER'>('CONTRACTOR');
  email = signal<string>('ahmed@rameshconstructions.com');
  password = signal<string>('demo1234');
  isLoading = signal<boolean>(false);
  errorMsg = signal<string>('');
  isAccessOpen = signal(false);
  accessName = signal('');
  accessEmail = signal('');
  accessSubmitted = signal(false);

  readonly roleProfiles: Record<'CONTRACTOR' | 'WORKER', {
    label: string;
    icon: string;
    email: string;
    name: string;
    desc: string;
    tag: string;
    accentClass: string;
  }> = {
    CONTRACTOR: {
      label: 'Contractor',
      icon: '🏢',
      email: 'ahmed@rameshconstructions.com',
      name: 'Ahmed Shaik',
      desc: 'Manage your workforce, projects, and contractor network',
      tag: 'Ramesh Constructions',
      accentClass: 'role-contractor'
    },
    WORKER: {
      label: 'Site Worker',
      icon: '👷',
      email: 'ravi.kumar@worker.buildlink.in',
      name: 'Ravi Kumar',
      desc: 'View your assignments, attendance, and earnings',
      tag: 'Senior Mason',
      accentClass: 'role-worker'
    }
  };

  get activeProfile() {
    return this.roleProfiles[this.selectedRole()];
  }

  submitLabel(): string {
    if (this.isLoading()) return this.i18n.t('login.openingGate');
    const roleKey = this.selectedRole() === 'CONTRACTOR' ? 'login.contractorRole' : 'login.workerRole';
    return this.i18n.t('login.enterAs', { role: this.i18n.t(roleKey) });
  }

  selectRole(role: 'CONTRACTOR' | 'WORKER'): void {
    this.selectedRole.set(role);
    this.email.set(this.roleProfiles[role].email);
    this.errorMsg.set('');
  }

  onLogin(): void {
    if (!this.email() || !this.password()) {
      this.errorMsg.set(this.i18n.t('login.fillFields'));
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set('');
    this.loader.show('loader.openingGate');

    setTimeout(() => {
      this.authService.login(this.selectedRole());
      this.isLoading.set(false);
      this.loader.hide();

      if (this.selectedRole() === 'CONTRACTOR') {
        this.router.navigate(['/contractor/dashboard']);
      } else {
        this.router.navigate(['/worker/dashboard']);
      }
    }, 800);
  }

  openEarlyAccess(): void {
    this.accessSubmitted.set(false);
    this.isAccessOpen.set(true);
  }

  closeEarlyAccess(): void {
    this.isAccessOpen.set(false);
  }

  submitEarlyAccess(): void {
    if (!this.accessName() || !this.accessEmail()) {
      return;
    }
    this.accessSubmitted.set(true);
  }
}
