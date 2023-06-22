import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordSecurityRoutingModule } from './password-security-routing.module';
import { PasswordSecurityComponent } from './password-security/password-security.component';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    PasswordSecurityComponent
  ],
  imports: [
    CommonModule,
    PasswordSecurityRoutingModule,
    HttpClientModule
  ]
})
export class PasswordSecurityModule { }
