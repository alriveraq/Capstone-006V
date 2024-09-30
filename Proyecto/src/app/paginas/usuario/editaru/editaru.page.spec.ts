import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditaruPage } from './editaru.page';

describe('EditaruPage', () => {
  let component: EditaruPage;
  let fixture: ComponentFixture<EditaruPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaruPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
