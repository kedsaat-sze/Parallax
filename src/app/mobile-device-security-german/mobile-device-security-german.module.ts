import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileDeviceSecurityGermanComponent } from './mobile-device-security-german/mobile-device-security-german.component';
import { MobileDeviceSecurityGermanRoutingModule } from "./mobile-device-security-german-routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    MobileDeviceSecurityGermanComponent
  ],
  imports: [
    CommonModule,
    MobileDeviceSecurityGermanRoutingModule,
    HttpClientModule
  ]
})
export class MobileDeviceSecurityGermanModule { }
