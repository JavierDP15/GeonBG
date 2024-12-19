import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Personaje } from 'src/app/interfaces/personaje';
import { PersonajesService } from 'src/app/services/personajes.service';
import { BotonPersonajeComponent } from 'src/app/componentes/boton-personaje/boton-personaje.component';

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
  personajes: Personaje[] = [];

  constructor(
    private personajesService: PersonajesService
  ) { }

  ngOnInit() {
    this.personajes = this.personajesService.getPersonajes();
  }

}
