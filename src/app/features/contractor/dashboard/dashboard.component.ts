import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { WorkforceStore } from '../../../state/workforce.store';
import { MarketplaceStore } from '../../../state/marketplace.store';
import { ProjectStore } from '../../../state/project.store';
import { MachineryStore } from '../../../state/machinery.store';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ProgressBarComponent } from '../../../shared/ui/progress-bar/progress-bar.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-contractor-dashboard',
  standalone: true,
  imports: [RouterLink, ButtonComponent, ProgressBarComponent, TranslatePipe, LocaleLabelPipe, LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorDashboardComponent {
  readonly auth = inject(AuthService);
  readonly workforceStore = inject(WorkforceStore);
  readonly marketplaceStore = inject(MarketplaceStore);
  readonly projectStore = inject(ProjectStore);
  readonly machineryStore = inject(MachineryStore);
  readonly i18n = inject(I18nService);

  readonly firstName = computed(() => this.auth.currentUser()?.name.split(' ')[0] ?? 'there');

  readonly utilization = computed(() => {
    const total = this.workforceStore.totalWorkersCount();
    if (!total) return 0;
    return Math.round((this.workforceStore.deployedCount() / total) * 100);
  });

  readonly availableLane = computed(() =>
    this.workforceStore.workers().filter(w => w.status === 'AVAILABLE' || w.status === 'COMING_AVAILABLE').slice(0, 6)
  );

  readonly deployedLane = computed(() =>
    this.workforceStore.workers().filter(w => w.status === 'DEPLOYED').slice(0, 6)
  );

  readonly restLane = computed(() =>
    this.workforceStore.workers().filter(w => w.status === 'ON_LEAVE' || w.status === 'UNAVAILABLE').slice(0, 6)
  );
}
