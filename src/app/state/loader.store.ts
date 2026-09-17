import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderStore {
  private depth = 0;
  private shownAt = 0;
  private hideTimer: number | null = null;
  private readonly minVisibleMs = 480;
  private readonly _visible = signal(false);
  private readonly _messageKey = signal('loader.hoisting');

  readonly visible = this._visible.asReadonly();
  readonly messageKey = this._messageKey.asReadonly();

  show(messageKey = 'loader.hoisting'): void {
    this.depth += 1;
    this._messageKey.set(messageKey);
    if (this.hideTimer !== null) {
      window.clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (!this._visible()) {
      this.shownAt = Date.now();
    }
    this._visible.set(true);
  }

  hide(): void {
    this.depth = Math.max(0, this.depth - 1);
    if (this.depth > 0) return;

    const remaining = Math.max(0, this.minVisibleMs - (Date.now() - this.shownAt));
    this.hideTimer = window.setTimeout(() => {
      if (this.depth === 0) this._visible.set(false);
      this.hideTimer = null;
    }, remaining);
  }
}
