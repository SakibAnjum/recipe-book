import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipes} from "../../models/recipe";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShopingListService} from "../../services/shoping-list";
import {RecipesService} from "../../services/recipes";



@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipes;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShopingListService,
    private recipeService: RecipesService
    ) {
  }


  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }


  onEdit(){
    this.navCtrl.push('EditRecipePage',
      {mode: 'Edit', recipe: this.recipe, index: this.index })
  }

  onAddIng(){
    this.slService.addItems(this.recipe.ingredients);
  }

  onDel(){
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot()
  }


}
