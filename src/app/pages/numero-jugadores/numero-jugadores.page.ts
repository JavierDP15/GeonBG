import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JugadoresService } from 'src/app/services/jugadores/jugadores.service';

@Component({
  selector: 'app-numero-jugadores',
  templateUrl: './numero-jugadores.page.html',
  styleUrls: ['./numero-jugadores.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NumeroJugadoresPage implements OnInit {

  numJugadores: number = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private jugadoresService: JugadoresService
  ) { }

  ngOnInit() { }

  submit() {
    for (let i = 1; i <= this.numJugadores; i++) {
      this.jugadoresService.addJugador(`Jugador ${i}`)
    }
    this.router.navigate(['/nombre-jugador', 1])
  }
}
