import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Personaje } from 'src/app/interfaces/personaje';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { JugadoresService } from 'src/app/services/jugadores/jugadores.service';
import { BotonPersonajeComponent } from 'src/app/componentes/boton-personaje/boton-personaje.component';
import { ActivatedRoute } from '@angular/router';
import { Jugador } from 'src/app/interfaces/jugador';
import { SqliteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-seleccion-pj',
  templateUrl: './seleccion-pj.page.html',
  styleUrls: ['./seleccion-pj.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    BotonPersonajeComponent
  ]
})
export class SeleccionPjPage implements OnInit {
  jugadorId: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  cantidadJugadores: number | null = null;
  jugadores = this.jugadoresService.getJugadores();
  personajes: Personaje[] = [];
  // personajes = this.personajesService.getPersonajes();
  // personajeSeleccionado: number | null = null;

  constructor(
    private sqlite: SqliteService,
    private personajesService: PersonajesService,
    private jugadoresService: JugadoresService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    try {
      this.personajes = this.personajesService.getPersonajes();
      this.cantidadJugadores = this.jugadores().length;
    } catch (error) {
      console.error('Se ha producido un error.')
    }
  }
}
