import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAndAuthenticationComponent } from './password-and-authentication.component';

describe('PasswordAndAuthenticationComponent', () => {
  let component: PasswordAndAuthenticationComponent;
  let fixture: ComponentFixture<PasswordAndAuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordAndAuthenticationComponent]
    });
    fixture = TestBed.createComponent(PasswordAndAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
