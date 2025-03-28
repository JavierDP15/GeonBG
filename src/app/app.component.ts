import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { StatusBar } from '@capacitor/status-bar';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { ReactiveFormsModule } from '@angular/forms';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { SqliteService } from './services/sqlite.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, 
    IonRouterOutlet,
    ReactiveFormsModule
  ],
})
export class AppComponent {
  constructor(
    private database: SqliteService,
    private platform: Platform
  ) {
    ScreenOrientation.lock({ orientation: 'landscape'}); // Bloquea la orientación
    StatusBar.hide();
    this.initApp();
  }

  async initApp() {
    await this.platform.ready();
    console.log('Iniciando base de datos...');
    await this.database.inicBD();
    console.log('Base de datos iniciada');

    this.platform.pause.subscribe(() => {
      this.onPause();
    })
  }

  async onPause() {
    try {
      await this.database.guardarDatos();
      this.database.closeConnection();
      console.log('La aplicación se ha pausado y los datos se han guardado correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos al pausar la aplicacion:', error);
    }
  }
}
