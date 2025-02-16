import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Personaje } from 'src/app/interfaces/personaje';

@Component({
  selector: 'app-boton-personaje',
  templateUrl: './boton-personaje.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./boton-personaje.component.scss'],
})
export class BotonPersonajeComponent  implements OnInit {
  @Input() personaje!: Personaje;
  @Input() index!: number;
  @Input() id_jugador!: number;
  // @Output() personajeSeleccionado = new EventEmitter<number>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  esPar(num: number): boolean {
    return num % 2 === 0;
  }

  onClick() {
    console.log(this.index);
    this.router.navigate(['/hoja-personaje-selec', this.index + 1, this.id_jugador])
  }
}
