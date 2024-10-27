import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CPublicacionPage } from './c-publicacion.page';

describe('CPublicacionPage', () => {
  let component: CPublicacionPage;
  let fixture: ComponentFixture<CPublicacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
