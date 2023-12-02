import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhishingComponent } from './phishing/phishing.component';
import { PhishingRoutingModule } from "./phishing-routing.module";
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    PhishingComponent
  ],
  imports: [
    CommonModule,
    PhishingRoutingModule,
    HttpClientModule,
    MatCardModule
  ]
})
export class PhishingModule {
  constructor() {}
}
