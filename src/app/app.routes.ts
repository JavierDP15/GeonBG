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
    path: 'numero-jugadores',
    loadComponent: () => import('./pages/numero-jugadores/numero-jugadores.page').then(m => m.NumeroJugadoresPage)
  },
  {
    path: 'nombre-jugador/:id',
    loadComponent: () => import('./pages/nombre-jugador/nombre-jugador.page').then(m => m.NombreJugadorPage)
  },
  {
    path: 'seleccion-pj/:id',
    loadComponent: () => import('./pages/seleccion-pj/seleccion-pj.page').then(m => m.SeleccionPjPage)
  },
  {
    path: 'hoja-personaje-selec/:id-pj/:id-jugador',
    loadComponent: () => import('./pages/hoja-personaje-selec/hoja-personaje-selec.page').then( m => m.HojaPersonajeSelecPage)
  },
  {
    path: 'comprobar-datos',
    loadComponent: () => import('./pages/comprobar-datos/comprobar-datos.page').then( m => m.ComprobarDatosPage)
  },
];
