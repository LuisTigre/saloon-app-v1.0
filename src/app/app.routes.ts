import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services.component').then(
        (c) => c.ServicesComponent
      ),
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./pages/schedule/schedule.component').then(
        (c) => c.ScheduleComponent
      ),
  },
  {
    path: 'def',
    loadComponent: () =>
      import('./components/default-layout/default-layout.component').then(
        (c) => c.DefaultLayoutComponent
      ),
  },
  { path: '**', redirectTo: '' }  // Redirect unknown paths to home
];
