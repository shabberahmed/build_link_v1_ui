import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface StepItem {
  number: number;
  label: string;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent {
  steps = input<StepItem[]>([]);
  activeStep = input<number>(1);
}
