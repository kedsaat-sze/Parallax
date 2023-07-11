import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDeviceSecurityGermanComponent } from './mobile-device-security-german.component';

describe('MobileDeviceSecurityGermanComponent', () => {
  let component: MobileDeviceSecurityGermanComponent;
  let fixture: ComponentFixture<MobileDeviceSecurityGermanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileDeviceSecurityGermanComponent]
    });
    fixture = TestBed.createComponent(MobileDeviceSecurityGermanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
