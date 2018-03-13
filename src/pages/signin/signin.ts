import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth-service";


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }


  onSignIn(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: "Signing In........"
    });
    loading.present();

    this.authService.signIn(form.value.email,form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error =>{
        loading.dismiss();

        const alert = this.alertCtrl.create({
          title: "Sign up failed",
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }



}
