import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HojaPersonajeSelecPage } from './hoja-personaje-selec.page';

describe('HojaPersonajePage', () => {
  let component: HojaPersonajeSelecPage;
  let fixture: ComponentFixture<HojaPersonajeSelecPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaPersonajeSelecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
