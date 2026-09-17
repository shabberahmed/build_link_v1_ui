import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { Crew } from '../../../data-access/models/crew.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { BadgeComponent } from '../../ui/badge/badge.component';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-crew-card',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent, TranslatePipe, LocaleLabelPipe],
  templateUrl: './crew-card.component.html',
  styleUrl: './crew-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewCardComponent {
  readonly i18n = inject(I18nService);
  crew = input.required<Crew>();
  requestCrewClick = output<Crew>();
}
