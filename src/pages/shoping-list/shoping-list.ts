import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";



@IonicPage()
@Component({
  selector: 'page-shoping-list',
  templateUrl: 'shoping-list.html',
})
export class ShopingListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  OnAddItem(form:NgForm){
      console.log(form);
    }

}
