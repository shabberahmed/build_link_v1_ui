import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastStore {
  private readonly _message = signal<string | null>(null);
  readonly message = this._message.asReadonly();

  show(message: string, durationMs = 2600): void {
    this._message.set(message);
    window.setTimeout(() => {
      if (this._message() === message) this._message.set(null);
    }, durationMs);
  }

  dismiss(): void {
    this._message.set(null);
  }
}
