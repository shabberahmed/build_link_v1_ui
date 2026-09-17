import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ToastStore } from '../../../state/toast.store';

@Component({
  selector: 'app-toast-host',
  standalone: true,
  template: `
    <div class="toast-host" aria-live="polite">
      @if (store.message(); as msg) {
        <button type="button" class="toast" (click)="store.dismiss()">{{ msg }}</button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastHostComponent {
  readonly store = inject(ToastStore);
}
