import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransformatorComponent } from "./transformator/transformator.component";

const routes: Routes = [
  {
    path: '',
    component: TransformatorComponent
  },
  {
    path: 'transformator',
    component: TransformatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransformatorRoutingModule { }
