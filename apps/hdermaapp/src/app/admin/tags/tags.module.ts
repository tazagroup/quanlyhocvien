import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { TagsComponent } from './tags.component';
import { TagDetailComponent } from './tag-detail/tag-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: TagsComponent,
        children: [
          { path: '', component: TagDetailComponent },
          { path: ':id', component: TagDetailComponent },
        ]
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [TagsComponent, TagDetailComponent],
})
export class TagsModule { }
