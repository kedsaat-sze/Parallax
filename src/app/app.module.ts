import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { AngularDeviceInformationService } from 'angular-device-information';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule
  ],
  providers: [AngularDeviceInformationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
