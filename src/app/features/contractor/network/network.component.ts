import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { NetworkStore } from '../../../state/network.store';
import { Contractor } from '../../../data-access/models/contractor.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { ContractorCardComponent } from '../../../shared/domain/contractor-card/contractor-card.component';
import { TrustScoreComponent } from '../../../shared/ui/trust-score/trust-score.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [ContractorCardComponent, TrustScoreComponent, ModalComponent, ButtonComponent, TranslatePipe],
  templateUrl: './network.component.html',
  styleUrl: './network.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkComponent {
  readonly networkStore = inject(NetworkStore);
  readonly i18n = inject(I18nService);

  selectedContractorForModal = signal<Contractor | undefined>(undefined);

  onConnectToggle(contractor: Contractor): void {
    this.networkStore.toggleConnect(contractor.id);
  }

  openContractorModal(c: Contractor): void {
    this.selectedContractorForModal.set(c);
  }

  closeContractorModal(): void {
    this.selectedContractorForModal.set(undefined);
  }
}
