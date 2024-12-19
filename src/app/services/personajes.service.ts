import { Injectable } from '@angular/core';
import { Personaje } from '../interfaces/personaje';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private personajes: Personaje[] = [];

  constructor() { }

  inicializarDatosJuego(): void {
    this.personajes = [
      {nombre: 'Anush Faris', retrato: 'assets/retratos/Anush_Faris.png', foto: '', seleccionado: false},
      {nombre: 'Daria Samira', retrato: 'assets/retratos/Daria_Samira.png', foto: '', seleccionado: false},
      {nombre: 'Elmira Falak', retrato: 'assets/retratos/Elmira_Falak.png', foto: '', seleccionado: false},
      {nombre: 'Kamran Soroush', retrato: 'assets/retratos/Kamran_Soroush.png', foto: '', seleccionado: false},
      {nombre: 'Kavan Arash', retrato: 'assets/retratos/Kavan_Arash.png', foto: '', seleccionado: false},
      {nombre: 'Mahdi Kaveh', retrato: 'assets/retratos/Mahdi_Kaveh.png', foto: '', seleccionado: false},
      {nombre: 'Nahid Minoo', retrato: 'assets/retratos/Nahid_Minoo.png', foto: '', seleccionado: false},
      {nombre: 'Renad Alkifa', retrato: 'assets/retratos/Renad_Alkifa.png', foto: '', seleccionado: false},
      {nombre: 'Tarsa Yasmin', retrato: 'assets/retratos/Tarsa_Yasmin.png', foto: '', seleccionado: false},
      {nombre: 'Xander Vasilios', retrato: 'assets/retratos/Xander_Vasilios.png', foto: '', seleccionado: false},
    ];
  }

  getPersonajes(): Personaje[] {
    return this.personajes;
  }
}
