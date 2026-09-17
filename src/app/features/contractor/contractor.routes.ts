import { Routes } from '@angular/router';

export const CONTRACTOR_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.ContractorDashboardComponent)
  },
  {
    path: 'workforce',
    loadComponent: () => import('./workforce/workforce.component').then(m => m.WorkforceComponent)
  },
  {
    path: 'crews',
    loadComponent: () => import('./crews/crews.component').then(m => m.CrewsComponent)
  },
  {
    path: 'availability',
    loadComponent: () => import('./availability/availability.component').then(m => m.AvailabilityComponent)
  },
  {
    path: 'machinery',
    loadComponent: () => import('./machinery/machinery.component').then(m => m.MachineryComponent)
  },
  {
    path: 'find-workforce',
    loadComponent: () => import('./find-workforce/find-workforce.component').then(m => m.FindWorkforceComponent)
  },
  {
    path: 'requests',
    loadComponent: () => import('./requests/requests.component').then(m => m.RequestsComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'network',
    loadComponent: () => import('./network/network.component').then(m => m.NetworkComponent)
  },
  {
    path: 'payments',
    loadComponent: () => import('./payments/payments.component').then(m => m.PaymentsComponent)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent)
  }
];
