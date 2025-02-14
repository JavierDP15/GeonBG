import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { Personaje } from 'src/app/interfaces/personaje';

@Component({
  selector: 'app-hoja-personaje',
  templateUrl: './hoja-personaje.component.html',
  styleUrls: ['./hoja-personaje.component.scss'],
  standalone: true
})
export class HojaPersonajeComponent  implements OnInit {
  @Input() personaje!: Personaje;
  @Output() deseleccionar = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    console.log('Hoja de personaje');
  }

  onDeseleccionar() {
    this.deseleccionar.emit();
  }
}
