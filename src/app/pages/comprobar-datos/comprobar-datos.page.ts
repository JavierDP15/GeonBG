import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { JugadoresService } from 'src/app/services/jugadores/jugadores.service';
import { Personaje } from 'src/app/interfaces/personaje';
import { Jugador } from 'src/app/interfaces/jugador';
import { SqliteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-comprobar-datos',
  templateUrl: './comprobar-datos.page.html',
  styleUrls: ['./comprobar-datos.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ComprobarDatosPage{
  personajesSeleccionados: Personaje[] = [];
  jugadores = this.jugadoresService.getJugadores();
  personajes = this.personajesService.getPersonajes();

  constructor(
    private personajesService: PersonajesService,
    private jugadoresService: JugadoresService,
    private sqliteService: SqliteService
  ) { }

  async ionViewWillEnter() {
    this.personajes = await this.personajesService.getPersonajes()
    this.personajesSeleccionados = this.personajes.filter(personaje => personaje.seleccionado);
    console.log('Datos de personajes recibidos y filtrados:', JSON.stringify(this.personajesSeleccionados, null,2));
    // this.sqliteService.guardarDatos();
  }

}
