import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bl-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state-box">
      <div class="icon-circle">
        <ng-content select="[icon]"></ng-content>
      </div>
      <h4 class="title">{{ title() }}</h4>
      <p class="description">{{ description() }}</p>
      @if (actionLabel()) {
        <button class="action-btn" (click)="actionClick.emit()">
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  styles: [`
    .empty-state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 3rem 1.5rem;
      background-color: var(--bl-bg-surface);
      border: 1px dashed var(--bl-border-color);
      border-radius: var(--bl-radius-lg);

      .icon-circle {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: var(--bl-bg-surface-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--bl-text-muted);
        margin-bottom: 1rem;
      }

      .title {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--bl-text-main);
        margin-bottom: 0.5rem;
      }

      .description {
        font-size: 0.875rem;
        color: var(--bl-text-secondary);
        max-width: 360px;
        margin-bottom: 1.25rem;
        line-height: 1.5;
      }

      .action-btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 600;
        background-color: var(--bl-color-accent);
        color: black;
        border: none;
        border-radius: var(--bl-radius-md);
        cursor: pointer;
        transition: var(--bl-transition);

        &:hover {
          background-color: var(--bl-color-accent-hover);
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  title = input.required<string>();
  description = input.required<string>();
  actionLabel = input<string | undefined>(undefined);
  actionClick = output<void>();
}

@Component({
  selector: 'bl-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="modal-overlay" (click)="onBackdropClick($event)">
        <div class="modal-card animate-fade-in" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3 class="modal-title">{{ title() }}</h3>
            <button class="close-btn" (click)="close.emit()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background-color: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-card {
      background-color: var(--bl-bg-surface);
      border-radius: var(--bl-radius-lg);
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--bl-shadow-xl);
      overflow: hidden;

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid var(--bl-border-color);

        .modal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--bl-text-main);
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--bl-text-muted);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          border-radius: var(--bl-radius-sm);

          svg { width: 1.25rem; height: 1.25rem; }

          &:hover {
            color: var(--bl-text-main);
            background-color: var(--bl-bg-surface-secondary);
          }
        }
      }

      .modal-body {
        padding: 1.5rem;
        overflow-y: auto;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  isOpen = input.required<boolean>();
  title = input.required<string>();
  close = output<void>();

  onBackdropClick(event: MouseEvent): void {
    this.close.emit();
  }
}
