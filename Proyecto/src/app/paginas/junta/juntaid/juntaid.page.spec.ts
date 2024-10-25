import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuntaidPage } from './juntaid.page';

describe('JuntaidPage', () => {
  let component: JuntaidPage;
  let fixture: ComponentFixture<JuntaidPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JuntaidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
