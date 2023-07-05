import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDeviceSecurityComponent } from './mobile-device-security.component';

describe('MobileDeviceSecurityComponent', () => {
  let component: MobileDeviceSecurityComponent;
  let fixture: ComponentFixture<MobileDeviceSecurityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileDeviceSecurityComponent]
    });
    fixture = TestBed.createComponent(MobileDeviceSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
