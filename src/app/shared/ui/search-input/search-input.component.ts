import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {
  placeholder = input<string>('Search workers, trades, locations...');
  value = input<string>('');
  valueChange = output<string>();

  onInput(newVal: string): void {
    this.valueChange.emit(newVal);
  }
}
