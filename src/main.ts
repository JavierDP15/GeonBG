import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideIndexedDb } from 'ngx-indexed-db';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// const bdConfig = {
//   name: 'datosGeon',
//   version: 1,
//   objectStoresMeta: ([
//     {
//       store: 'jugadores',
//       storeConfig: { keyPath: 'id', autoIncrement: true },
//       storeSchema: [
//         { name: 'nombre', keypath: 'nombre', options: { unique: false } },
//         { name: 'personaje', keypath: 'personaje', options: { unique: true } }
//       ]
//     },
//     {
//       store: 'personajes',
//       storeConfig: { keyPath: 'nombre', autoIncrement: false },
//       storeSchema: [
//         { name: 'nombre', keypath: 'nombre', options: { unique: true } },
//         { name: 'retrato', keypath: 'retrato', options: { unique: false } },
//         { name: 'foto', keypath: 'foto', options: { unique: false } },
//         { name: 'seleccionado', keypath: 'seleccionado', options: { unique: false } }
//       ]
//     }
//   ])
// }

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // provideIndexedDb(bdConfig),
  ],
});
