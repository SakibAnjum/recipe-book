import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import fb from 'firebase';
import {AuthService} from "../services/auth-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "TabsPage";
  tabsPage = "TabsPage";
  signinPage = "SigninPage";
  signupPage = "SignupPage";
  isAuth = false;


  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    public manuCtrl: MenuController,
    public authService: AuthService,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // firebase setup
    fb.initializeApp({
      apiKey: "AIzaSyAgnOCZib8t35nPs0RCgVl7Ek6dsGdDfy0",
      authDomain: "recipe-book-5f58c.firebaseapp.com"
    });

    //firebase auth check
    fb.auth().onAuthStateChanged( user => {
      if(user) {
        this.isAuth = true;
        this.rootPage= this.tabsPage;
      }
      else{
        this.isAuth = false;
        this.rootPage=this.signinPage;
      }
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.manuCtrl.close();
  }



  onLogOut(){
    this.authService.signOut();
    this.manuCtrl.close();
    this.nav.setRoot(signinPage);
  }
}

