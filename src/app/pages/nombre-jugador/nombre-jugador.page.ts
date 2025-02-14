import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JugadoresService } from 'src/app/services/jugadores/jugadores.service';

@Component({
  selector: 'app-nombre-jugador',
  templateUrl: './nombre-jugador.page.html',
  styleUrls: ['./nombre-jugador.page.scss'],
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
export class NombreJugadorPage implements OnInit {
  jugadorId: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10)

  nombreJugador: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jugadoresService: JugadoresService
  ) { }

  ngOnInit() {}

  submit() {
    this.jugadoresService.setNombreJugador(this.nombreJugador, this.jugadorId);

    this.router.navigate(['seleccion-pj', this.jugadorId]);
  }

}
