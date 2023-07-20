import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZaloComponent } from './zalo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ZaloComponent }
    ])
  ],
  declarations: [ZaloComponent]
})
export class ZaloModule { }
