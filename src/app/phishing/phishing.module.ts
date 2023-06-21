import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhishingComponent } from './phishing/phishing.component';
import { PhishingRoutingModule } from "./phishing-routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    PhishingComponent
  ],
  imports: [
    CommonModule,
    PhishingRoutingModule,
    HttpClientModule
  ]
})
export class PhishingModule {
  constructor() {}
}
