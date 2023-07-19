import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordAndAuthenticationComponent } from './password-and-authentication/password-and-authentication.component';
import { PasswordAndAuthenticationRoutingModule } from "./password-and-authentication-routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    PasswordAndAuthenticationComponent
  ],
  imports: [
    CommonModule,
    PasswordAndAuthenticationRoutingModule,
    HttpClientModule
  ]
})

export class PasswordAndAuthenticationModule { }
