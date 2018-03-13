import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {ShopingListService} from "../services/shoping-list";
import {RecipesService} from "../services/recipes";
import {AuthService} from "../services/auth-service";

import {SlOptions} from '../pages/shoping-list/sl-options/sl-options'

@NgModule({
  declarations: [
    MyApp,
    SlOptions
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SlOptions
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShopingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
