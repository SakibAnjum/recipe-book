import {Ingredient} from "./ingredient";

export class Recipes{
  constructor(
    private title:string,
    public description: string,
    public difficulty: string,
    public ingredients: Ingredient[]
  ){

  }
}
