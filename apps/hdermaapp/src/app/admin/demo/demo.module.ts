import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { DemoComponent } from './demo.component';
import { DemoFileDetailComponent } from './demo-file-detail/demo-file-detail.component';
import { DemoFolderDetailComponent } from './demo-folder-detail/demo-folder-detail.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '', component: DemoComponent,
        children: [
          {
            path: 'file/:id',
            component: DemoFileDetailComponent
          },
          {
            path: 'folder/:id',
            component: DemoFolderDetailComponent
          }
        ]
      }
    ])],
  declarations: [
    DemoComponent,
    DemoFileDetailComponent,
    DemoFolderDetailComponent
  ]
})
export class DemosModule { }