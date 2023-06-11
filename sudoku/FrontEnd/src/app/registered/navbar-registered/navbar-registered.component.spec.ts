import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRegisteredComponent } from './navbar-registered.component';

describe('NavbarRegisteredComponent', () => {
  let component: NavbarRegisteredComponent;
  let fixture: ComponentFixture<NavbarRegisteredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarRegisteredComponent]
    });
    fixture = TestBed.createComponent(NavbarRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
