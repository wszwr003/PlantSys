import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BLE } from '@ionic-native/ble/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MainTabsPageModule } from './pages/main-tabs/main-tabs.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    MainTabsPageModule,
    NgbModule.forRoot(),  //TODO:what forroot mean
  ],
  providers: [
    BLE,
    ScreenOrientation,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
