import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    console.log(this.index);
  }

  esPar(num: number): boolean {
    return num % 2 === 0;
  }
}
