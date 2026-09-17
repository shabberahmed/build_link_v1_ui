import { Injectable, signal, computed } from '@angular/core';
import { AppNotification } from '../data-access/models/notification.model';
import { MOCK_NOTIFICATIONS } from '../data-access/repositories/mock/mock-data';

@Injectable({ providedIn: 'root' })
export class NotificationStore {
  private readonly _notifications = signal<AppNotification[]>([...MOCK_NOTIFICATIONS]);

  readonly notifications = this._notifications.asReadonly();
  readonly unreadCount = computed(() => this._notifications().filter(n => !n.read).length);

  markAsRead(id: string): void {
    this._notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this._notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  addNotification(partial: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): void {
    const item: AppNotification = {
      id: `n-${Date.now()}`,
      timestamp: 'time.justNow',
      read: false,
      ...partial
    };
    this._notifications.update(prev => [item, ...prev]);
  }
}
