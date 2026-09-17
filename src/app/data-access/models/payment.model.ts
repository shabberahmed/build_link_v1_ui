export type PaymentStatus = 'PENDING' | 'PAID' | 'PROCESSING';
export type PaymentType = 'WAGE_PAYOUT' | 'CONTRACTOR_SETTLEMENT' | 'ADVANCE';

export interface PaymentRecord {
  readonly id: string;
  readonly recipientName: string;
  readonly role: 'WORKER' | 'CONTRACTOR';
  readonly amount: number;
  readonly currency: 'INR';
  readonly date: string;
  readonly status: PaymentStatus;
  readonly type: PaymentType;
  readonly periodDescription: string;
  readonly referenceNumber: string;
}
