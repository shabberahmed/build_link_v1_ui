import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  stacked = input<boolean>(false);
  closeModal = output<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
