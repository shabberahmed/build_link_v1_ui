import { Routes } from '@angular/router';

export const WORKER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.WorkerDashboardComponent)
  },
  {
    path: 'jobs',
    loadComponent: () => import('./jobs/jobs.component').then(m => m.WorkerJobsComponent)
  },
  {
    path: 'attendance',
    loadComponent: () => import('./attendance/attendance.component').then(m => m.WorkerAttendanceComponent)
  },
  {
    path: 'availability',
    loadComponent: () => import('./availability/availability.component').then(m => m.WorkerAvailabilityComponent)
  },
  {
    path: 'earnings',
    loadComponent: () => import('./earnings/earnings.component').then(m => m.WorkerEarningsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.WorkerProfileComponent)
  }
];
