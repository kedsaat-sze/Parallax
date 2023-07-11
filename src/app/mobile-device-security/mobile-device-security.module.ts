import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileDeviceSecurityRoutingModule } from './mobile-device-security-routing.module';
import { MobileDeviceSecurityComponent } from './mobile-device-security/mobile-device-security.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    MobileDeviceSecurityComponent
  ],
  imports: [
    CommonModule,
    MobileDeviceSecurityRoutingModule,
    HttpClientModule
  ]
})
export class MobileDeviceSecurityModule { }
