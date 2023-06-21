import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhishingComponent } from "./phishing/phishing.component";

const routes: Routes = [
  {
    path: '',
    component: PhishingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhishingRoutingModule { }
