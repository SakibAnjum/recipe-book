import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShopingListService} from "../../services/shoping-list";
import {Ingredient} from "../../models/ingredient";
import {SlOptions} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth-service";


@IonicPage()
@Component({
  selector: 'page-shoping-list',
  templateUrl: 'shoping-list.html',
})
export class ShopingListPage {
  listItem: Ingredient[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShopingListService,
    private popHoverCtrl: PopoverController,
    private authService: AuthService
    ) {}



  ionViewWillEnter(){
    this.loadItems();
  }

  OnAddItem(form:NgForm){
      this.slService.addItem(form.value.ingredientName,form.value.amount);
      form.reset();
      this.loadItems();
    }


  onCheckItem(index: number){
    this.slService.removeItem(index);
    this.loadItems();
    console.log(index);
  }


    private loadItems(){
      this.listItem = this.slService.getItems();
    }


  onShowOpt(event: MouseEvent){
    const popover = this.popHoverCtrl.create(SlOptions);
    popover.present({e: event});

    popover.onDidDismiss(
      data => {
        if(data.action == 'load'){

        }else{
          this.authService.getActiveUser().getIdToken()
            .then(
              (token:string) => {

              }
            )
            .catch();
        }
      }
    )
  }

}
