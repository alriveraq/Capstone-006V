import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuntapPage } from './juntap.page';

describe('JuntapPage', () => {
  let component: JuntapPage;
  let fixture: ComponentFixture<JuntapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JuntapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
