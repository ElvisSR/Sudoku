import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGuestComponent } from './main-guest.component';

describe('MainGuestComponent', () => {
  let component: MainGuestComponent;
  let fixture: ComponentFixture<MainGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainGuestComponent]
    });
    fixture = TestBed.createComponent(MainGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
