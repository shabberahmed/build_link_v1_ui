import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToastHostComponent } from './shared/ui/toast/toast.component';
import { LoaderHostComponent } from './shared/ui/loader/loader-host.component';
import { I18nService } from './core/i18n/i18n.service';
import { LoaderStore } from './state/loader.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastHostComponent, LoaderHostComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly loader = inject(LoaderStore);

  constructor() {
    inject(I18nService);
    const router = inject(Router);
    router.events.pipe(
      filter(event =>
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      )
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/' || event.url.startsWith('/auth/login')) {
          return;
        }
        this.loader.show('loader.hoisting');
      } else {
        this.loader.hide();
      }
    });
  }
}
