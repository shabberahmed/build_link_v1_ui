import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LoaderStore } from '../../../state/loader.store';
import { LoaderComponent } from './loader.component';

@Component({
  selector: 'app-loader-host',
  standalone: true,
  imports: [LoaderComponent],
  template: `
    @if (store.visible()) {
      <div class="loader-overlay" aria-live="polite" aria-busy="true">
        <app-loader [messageKey]="store.messageKey()"></app-loader>
      </div>
    }
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 1400;
      pointer-events: none;
    }

    .loader-overlay {
      pointer-events: auto;
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      background:
        radial-gradient(720px 360px at 50% 30%, rgba(45, 212, 191, 0.12), transparent 55%),
        rgba(11, 18, 32, 0.78);
      backdrop-filter: blur(10px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderHostComponent {
  readonly store = inject(LoaderStore);
}
