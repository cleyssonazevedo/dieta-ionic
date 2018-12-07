import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PratoService } from './services/prato.service';
import { IonicGestureConfigService } from './services/ionic-gesture-config.service';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [AppComponent],
  entryComponents: [],
  providers: [
    StatusBar,
    SplashScreen,
    PratoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfigService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
