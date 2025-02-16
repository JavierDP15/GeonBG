import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprobarDatosPage } from './comprobar-datos.page';

describe('ComprobarDatosPage', () => {
  let component: ComprobarDatosPage;
  let fixture: ComponentFixture<ComprobarDatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobarDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
