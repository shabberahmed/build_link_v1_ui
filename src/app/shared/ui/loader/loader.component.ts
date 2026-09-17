import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  compact = input(false);
  messageKey = input('loader.hoisting');
}
