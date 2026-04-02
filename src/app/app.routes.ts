import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services-page/services-page.component').then((m) => m.ServicesPageComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects-page/projects-page.component').then((m) => m.ProjectsPageComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact-page/contact-page.component').then((m) => m.ContactPageComponent),
  },
  {
    path: 'inquiry',
    loadComponent: () =>
      import('./pages/inquiry-page/inquiry-page.component').then((m) => m.InquiryPageComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
