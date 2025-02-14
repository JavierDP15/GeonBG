import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StatusBar } from '@capacitor/status-bar';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { ReactiveFormsModule } from '@angular/forms';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { SqliteService } from './services/sqlite.service';

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
    private database: SqliteService
  ) {
    ScreenOrientation.lock({ orientation: 'landscape'}); // Bloquea la orientación

    StatusBar.hide();

    this.initApp();
  }

  async initApp() {
    await this.database.inicBD();
  }
}
