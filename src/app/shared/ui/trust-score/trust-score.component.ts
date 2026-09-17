import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { TrustScoreBreakdown } from '../../../data-access/models/contractor.model';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-trust-score',
  standalone: true,
  imports: [ProgressBarComponent, TranslatePipe],
  templateUrl: './trust-score.component.html',
  styleUrl: './trust-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrustScoreComponent {
  trustScore = input<TrustScoreBreakdown>({
    overall: 92,
    paymentReliability: 98,
    workforceReliability: 94,
    projectCompletion: 91,
    professionalism: 93,
    verificationScore: 100
  });
}
