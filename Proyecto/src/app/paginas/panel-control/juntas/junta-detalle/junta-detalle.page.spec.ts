import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuntaDetallePage } from './junta-detalle.page';

describe('JuntaDetallePage', () => {
  let component: JuntaDetallePage;
  let fixture: ComponentFixture<JuntaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JuntaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
