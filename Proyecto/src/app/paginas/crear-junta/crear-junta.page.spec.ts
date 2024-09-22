import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearJuntaPage } from './crear-junta.page';

describe('CrearJuntaPage', () => {
  let component: CrearJuntaPage;
  let fixture: ComponentFixture<CrearJuntaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearJuntaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
