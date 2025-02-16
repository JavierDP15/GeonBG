import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { JugadoresService } from '../services/jugadores/jugadores.service';
import { PersonajesService } from '../services/personajes/personajes.service';
import { Router } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';
import { Platform } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  partidaEnCurso: boolean = false;

  constructor(
    private sqliteService: SqliteService,
    private personajesService: PersonajesService,
    private jugadoresService: JugadoresService,
    private router: Router,
    private platform: Platform) {}

    async ngOnInit() {
      this.partidaEnCurso = await this.sqliteService.hayPartidaEnCurso();
    }

    async iniciarNuevaPartida() {
      try {
        await this.sqliteService.resetearTablas();
        await this.personajesService.reiniciarPersonajes();
        console.log('Partida iniciada con exito');
      } catch (error) {
        console.error('Error al iniciar nueva partida:', error);
      }
      this.router.navigate(['/numero-jugadores']);
    }

    continuarPartida() {
      
    }

}
