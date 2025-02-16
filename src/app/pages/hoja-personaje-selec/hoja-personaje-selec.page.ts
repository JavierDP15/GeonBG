import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Personaje } from 'src/app/interfaces/personaje';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { JugadoresService } from 'src/app/services/jugadores/jugadores.service';
import { Jugador } from 'src/app/interfaces/jugador';

@Component({
  selector: 'app-hoja-personaje-selec',
  templateUrl: './hoja-personaje-selec.page.html',
  styleUrls: ['./hoja-personaje-selec.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule
  ]
})
export class HojaPersonajeSelecPage implements OnInit {
  // @Input() personaje!: Personaje;
  jugadorId: number = parseInt(this.route.snapshot.paramMap.get('id-jugador')!, 10);
  personajeId: number = parseInt(this.route.snapshot.paramMap.get('id-pj')!, 10);
  personaje: Personaje | null = null;
  // jugadores: Jugador[] = [];
  jugadores = this.jugadoresService.getJugadores();
  
  constructor(
    private router: Router,
    private personajesService: PersonajesService,
    private jugadoresService: JugadoresService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    try {
      this.personaje = await this.personajesService.getPersonajePorID(this.personajeId);
      this.jugadores = await this.jugadoresService.getJugadores();
      // console.log(jugadores);
    } catch (error) {
      console.error('Error al mostrar el personaje:', error);
    }
  }
  
  async seleccionar() {
    console.log('Jugador ', this.jugadorId);
    console.log('Cantidad de jugadores: ', this.jugadores);
    await this.personajesService.seleccionarPersonaje(this.jugadorId, this.personajeId)
    if (this.jugadorId < this.jugadores().length) {
      this.router.navigate(['/nombre-jugador', this.jugadorId + 1])
    } else {
      console.log('No hay más jugadores');
    }
  }

  cerrar() {
    this.router.navigate(['/seleccion-pj', this.jugadorId]);
  }
}
