import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'apps/demo/src/environments/environment';
import { GoogleChartsModule } from 'angular-google-charts';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete'; 
import { DemoSiteModule } from './demosite.module';
import { MaterialModule } from './shared/material.module';
const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.FirebaseInit),
    AngularFireMessagingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    GoogleChartsModule,
    MaterialModule,
    NotifierModule,
    NotifierModule.withConfig( {
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
    }),
    RouterModule.forRoot([
      // {path: '404-not-found', pathMatch: 'full', component: Loi404Component},
      // {path: '**', redirectTo: '404-not-found'},
    ], routerConfig),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DemoSiteModule,
    //SharedModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: false,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    GooglePlaceModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
