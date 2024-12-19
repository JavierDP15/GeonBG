import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { PersonajesService } from '../services/personajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor(
    private gameData: PersonajesService,
    private router: Router) {}

  nuevaPartida() {
    this.gameData.inicializarDatosJuego();

    this.router.navigate(['/seleccion-pj']);
  }
}
