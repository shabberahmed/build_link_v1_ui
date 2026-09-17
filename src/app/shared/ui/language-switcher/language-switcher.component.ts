import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AppLocale } from '../../../core/i18n/i18n.types';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  readonly i18n = inject(I18nService);
  inverted = input(false);

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as AppLocale;
    this.i18n.setLocale(value);
  }
}
