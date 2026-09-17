import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'contractor',
    loadComponent: () =>
      import('./layout/contractor-shell/contractor-shell.component').then(m => m.ContractorShellComponent),
    canActivate: [roleGuard('CONTRACTOR')],
    loadChildren: () =>
      import('./features/contractor/contractor.routes').then(m => m.CONTRACTOR_ROUTES)
  },
  {
    path: 'worker',
    loadComponent: () =>
      import('./layout/worker-shell/worker-shell.component').then(m => m.WorkerShellComponent),
    canActivate: [roleGuard('WORKER')],
    loadChildren: () =>
      import('./features/worker/worker.routes').then(m => m.WORKER_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
