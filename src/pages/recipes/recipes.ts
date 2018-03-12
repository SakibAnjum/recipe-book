import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {Recipes} from "../../models/recipe";
import {RecipesService} from "../../services/recipes";
import {RecipePage} from "../recipe/recipe";


@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipes[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recipesService: RecipesService) {
  }

  onNewRecipe(){
    this.navCtrl.push('EditRecipePage',{mode: 'New'});
  }

  onLoadRecipe(recipe: Recipes,index: number){
    this.navCtrl.push('RecipePage', {recipe: recipe,index: index});
  }

  ionViewWillEnter(){
    this.recipes = this.recipesService.getRecipes();
  }

}
