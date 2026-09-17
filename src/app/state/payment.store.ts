import { Injectable, signal, computed } from '@angular/core';
import { PaymentRecord, PaymentType } from '../data-access/models/payment.model';
import { MOCK_PAYMENTS } from '../data-access/repositories/mock/mock-data';

export interface InitiatePayoutDto {
  readonly recipientName: string;
  readonly role: PaymentRecord['role'];
  readonly amount: number;
  readonly type: PaymentType;
  readonly periodDescription: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentStore {
  private readonly _payments = signal<PaymentRecord[]>([...MOCK_PAYMENTS]);
  private readonly _lastPayoutId = signal<string | null>(null);

  readonly payments = this._payments.asReadonly();
  readonly lastPayoutId = this._lastPayoutId.asReadonly();
  readonly pendingCount = computed(() =>
    this._payments().filter(p => p.status !== 'PAID').length
  );

  initiatePayout(dto: InitiatePayoutDto): void {
    const id = `pay-${Date.now()}`;
    const record: PaymentRecord = {
      id,
      recipientName: dto.recipientName,
      role: dto.role,
      amount: dto.amount,
      currency: 'INR',
      date: new Date().toISOString().split('T')[0],
      status: 'PROCESSING',
      type: dto.type,
      periodDescription: dto.periodDescription,
      referenceNumber: `UPI/${Date.now()}`
    };
    this._payments.update(prev => [record, ...prev]);
    this._lastPayoutId.set(id);
  }

  markPaid(id: string): void {
    this._payments.update(list =>
      list.map(p => p.id === id ? { ...p, status: 'PAID' } : p)
    );
  }

  clearLastPayout(): void {
    this._lastPayoutId.set(null);
  }
}
