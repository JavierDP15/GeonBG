import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { JugadoresService } from '../services/jugadores/jugadores.service';
import { PersonajesService } from '../services/personajes/personajes.service';
import { Router } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';
import { Platform } from '@ionic/angular/standalone';
import { PartidaService } from '../services/partida/partida.service';
import { Partida } from '../interfaces/partida';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, SharedModule],
})
export class HomePage {
  partidaEnCurso: boolean = false;
  personajes = this.personajesService.getPersonajes();
  jugadores = this.jugadoresService.getJugadores();

  constructor(
    private sqliteService: SqliteService,
    private personajesService: PersonajesService,
    private jugadoresService: JugadoresService,
    private partidaService: PartidaService,
    private router: Router,
    private platform: Platform
    ) {}

    // async ngOnInit() {
    //   // this.partidaEnCurso = await this.partidaService.hayPartidaEnCurso();
    //   console.log(this.partidaEnCurso);
    //   this.partidaEnCurso = await this.partidaService.hayPartidaEnCurso();
    //   console.log(this.partidaEnCurso);
    //   console.log(this.partida);
    // }

    async ionViewWillEnter() {
      console.log("ionViewWillEnter ejecutado");
      await this.esperar(3000);
      this.partidaEnCurso = await this.partidaService.hayPartidaEnCurso();
      await this.personajesService.loadPersonajes();
      await this.jugadoresService.loadJugadores();
      console.log('Datos de personajes recibidos y filtrados:', JSON.stringify(this.personajes, null,2));
      console.log('Datos de personajes recibidos y filtrados:', JSON.stringify(this.jugadores, null,2));
    }

    async esperar(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
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
      this.router.navigate(['/comprobar-datos']);
    }

}
