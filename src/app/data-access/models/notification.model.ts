export type NotificationCategory = 'REQUEST' | 'AVAILABILITY' | 'PAYMENT' | 'PROJECT' | 'NETWORK' | 'SYSTEM';

export interface AppNotification {
  readonly id: string;
  readonly title: string;
  readonly message: string;
  readonly timestamp: string;
  readonly read: boolean;
  readonly category: NotificationCategory;
  readonly actionUrl?: string;
}
