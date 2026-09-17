import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentStore } from '../../../state/payment.store';
import { WorkforceStore } from '../../../state/workforce.store';
import { NetworkStore } from '../../../state/network.store';
import { NotificationStore } from '../../../state/notification.store';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { PaymentType } from '../../../data-access/models/payment.model';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent, BadgeComponent, ButtonComponent, ModalComponent, TranslatePipe, LocaleLabelPipe],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent {
  readonly paymentStore = inject(PaymentStore);
  readonly workforceStore = inject(WorkforceStore);
  readonly networkStore = inject(NetworkStore);
  readonly i18n = inject(I18nService);
  private readonly notifications = inject(NotificationStore);
  private readonly fb = inject(FormBuilder);

  isPayoutOpen = signal(false);

  payoutForm = this.fb.nonNullable.group({
    recipientName: ['', Validators.required],
    role: ['WORKER' as 'WORKER' | 'CONTRACTOR'],
    amount: [9000, [Validators.required, Validators.min(100)]],
    type: ['WAGE_PAYOUT' as PaymentType],
    periodDescription: ['Current period payout', Validators.required]
  });

  openPayout(): void {
    const firstWorker = this.workforceStore.workers()[0];
    this.payoutForm.patchValue({
      recipientName: firstWorker?.name ?? 'Ravi Kumar',
      role: 'WORKER',
      type: 'WAGE_PAYOUT'
    });
    this.isPayoutOpen.set(true);
  }

  closePayout(): void {
    this.isPayoutOpen.set(false);
  }

  submitPayout(): void {
    if (this.payoutForm.invalid) return;
    const val = this.payoutForm.getRawValue();
    this.paymentStore.initiatePayout(val);
    this.notifications.addNotification({
      title: this.i18n.t('notif.payoutInitiated'),
      message: this.i18n.t('notif.payoutInitiatedBody', {
        amount: val.amount.toLocaleString('en-IN'),
        name: val.recipientName
      }),
      category: 'PAYMENT',
      actionUrl: '/contractor/payments'
    });
    this.closePayout();
  }

  completePayout(id: string): void {
    this.paymentStore.markPaid(id);
  }
}
