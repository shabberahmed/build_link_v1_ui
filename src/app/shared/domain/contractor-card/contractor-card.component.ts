import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { Contractor } from '../../../data-access/models/contractor.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { AvatarComponent } from '../../ui/avatar/avatar.component';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-contractor-card',
  standalone: true,
  imports: [AvatarComponent, ButtonComponent, TranslatePipe],
  templateUrl: './contractor-card.component.html',
  styleUrl: './contractor-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorCardComponent {
  readonly i18n = inject(I18nService);
  contractor = input.required<Contractor>();
  connectClick = output<Contractor>();
  viewProfileClick = output<Contractor>();
}
