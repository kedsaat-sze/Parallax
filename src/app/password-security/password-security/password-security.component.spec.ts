import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSecurityComponent } from './password-security.component';

describe('PasswordSecurityComponent', () => {
  let component: PasswordSecurityComponent;
  let fixture: ComponentFixture<PasswordSecurityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordSecurityComponent]
    });
    fixture = TestBed.createComponent(PasswordSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
