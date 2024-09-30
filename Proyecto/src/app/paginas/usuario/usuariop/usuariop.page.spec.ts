import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariopPage } from './usuariop.page';

describe('UsuariopPage', () => {
  let component: UsuariopPage;
  let fixture: ComponentFixture<UsuariopPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
