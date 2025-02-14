import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumeroJugadoresPage } from './numero-jugadores.page';

describe('NumeroJugadoresPage', () => {
  let component: NumeroJugadoresPage;
  let fixture: ComponentFixture<NumeroJugadoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeroJugadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
