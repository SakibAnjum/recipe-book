import {Recipes} from "../models/recipe";
import {Ingredient} from "../models/ingredient";

export class RecipesService{
  private recipes: Recipes[] = [];

  addRecipe(
    title:string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]){
    this.recipes.push(new Recipes(title,description,difficulty,ingredients));
    console.log(this.recipes);
  }

  getRecipes(){
      return this.recipes.slice();
  }

  updateRecipes(
    index: number,
    title:string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]){

    this.recipes[index] = new Recipes(title,description,difficulty,ingredients);
  }


  removeRecipe(index:number){
      this.recipes.splice(index,1);
  }
}
