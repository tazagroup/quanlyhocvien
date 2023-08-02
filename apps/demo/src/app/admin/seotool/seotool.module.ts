import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeotoolComponent } from './seotool.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeotoolChitietComponent } from './seotool-chitiet/seotool-chitiet.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: SeotoolComponent},
      { path: ':id', component: SeotoolChitietComponent}
    ])
  ],
  exports: [RouterModule],
  declarations: [SeotoolComponent,SeotoolChitietComponent],
  providers: [SeotoolComponent]
})
export class SeotoolModule { }
