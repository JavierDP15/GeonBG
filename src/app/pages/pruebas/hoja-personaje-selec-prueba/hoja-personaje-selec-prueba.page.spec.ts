import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HojaPersonajeSelecPagePrueba } from './hoja-personaje-selec-prueba.page';

describe('HojaPersonajePage', () => {
  let component: HojaPersonajeSelecPagePrueba;
  let fixture: ComponentFixture<HojaPersonajeSelecPagePrueba>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaPersonajeSelecPagePrueba);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
