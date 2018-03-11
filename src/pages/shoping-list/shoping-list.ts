import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShopingListService} from "../../services/shoping-list";
import {Ingredient} from "../../models/ingredient";



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
    private slService: ShopingListService
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

}
