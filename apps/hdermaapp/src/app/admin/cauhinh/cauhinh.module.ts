import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CauhinhComponent } from './cauhinh.component';
import { ChiendichComponent } from './chiendich/chiendich.component';
import { HoahongComponent } from './hoahong/hoahong.component';
import { NhiemvuComponent } from './nhiemvu/nhiemvu.component';
import { MaterialModule } from '../../shared/material.module';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoiquaComponent } from './doiqua/doiqua.component';
import { ChiendichChitietComponent } from './chiendich/chiendich-chitiet/chiendich-chitiet.component';
import { CauhinhchungComponent } from './cauhinhchung/cauhinhchung.component';
import { CauhinhChitietComponent } from './cauhinhchung/cauhinh-chitiet/cauhinh-chitiet.component';
import { CauhinhapiComponent } from './cauhinhapi/cauhinhapi.component';
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};
@NgModule({
  declarations: [
    CauhinhComponent,
    HoahongComponent,
    ChiendichComponent,
    NhiemvuComponent,
    DoiquaComponent,
    ChiendichChitietComponent,
    CauhinhchungComponent,
    CauhinhChitietComponent,
    CauhinhapiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CauhinhComponent,
        children: [
          {
            path: 'hoahong',
            component: HoahongComponent,
          },
          {
            path: 'chiendich',
            component: ChiendichComponent,
            children:[
              {
                path: ':id',
                component: ChiendichChitietComponent,
              }
            ]
          },
          {
            path: 'nhiemvu',
            component: NhiemvuComponent,
          },
          {
            path: 'doiqua',
            component: DoiquaComponent,
          },
          {
            path: 'cauhinhchung',
            component: CauhinhchungComponent,
            children:[
              {
                path: ':slug',
                component: CauhinhChitietComponent,
              }
            ]
          },
          {
            path: 'cauhinhapi',
            component: CauhinhapiComponent,
            // children:[
            //   {
            //     path: ':slug',
            //     component: CauhinhChitietComponent,
            //   }
            // ]
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CauhinhModule {}
