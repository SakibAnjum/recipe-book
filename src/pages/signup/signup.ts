import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth-service";



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) {
  }



  onSignUp(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: "Signing Up........"
    });

    loading.present();

    this.authService.signUp(form.value.email,form.value.password)
      .then( data => {
        loading.dismiss();
      })
      .catch(er => {
        loading.dismiss();

        const alert = this.alertCtrl.create({
          title: "Sign up failed",
          message: er.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }






}
