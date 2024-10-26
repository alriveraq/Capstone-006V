import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeticionPage } from './peticion.page';

describe('PeticionPage', () => {
  let component: PeticionPage;
  let fixture: ComponentFixture<PeticionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
