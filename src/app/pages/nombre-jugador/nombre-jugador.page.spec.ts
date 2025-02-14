import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NombreJugadorPage } from './nombre-jugador.page';

describe('NombreJugadorPage', () => {
  let component: NombreJugadorPage;
  let fixture: ComponentFixture<NombreJugadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreJugadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
