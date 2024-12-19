import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionPjPage } from './seleccion-pj.page';

describe('SeleccionPjPage', () => {
  let component: SeleccionPjPage;
  let fixture: ComponentFixture<SeleccionPjPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionPjPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
