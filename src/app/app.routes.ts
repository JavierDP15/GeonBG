import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'seleccion-pj',
    loadComponent: () => import('./pages/seleccion-pj/seleccion-pj.page').then( m => m.SeleccionPjPage)
  },
];
