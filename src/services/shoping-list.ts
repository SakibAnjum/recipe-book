import {Ingredient} from "../models/ingredient";
import {Http} from "@angular/http";
import {AuthService} from "./auth-service";

export class ShopingListService{
  private ingredients:Ingredient[] = [];

  constructor(
    private http: Http,
    private authService: AuthService){}



  addItem(name: string, amount: number){
    this.ingredients.push(new Ingredient(name,amount));

    console.log(this.ingredients);
  }

  addItems(items:Ingredient[]){
    this.ingredients.push(...items);
  }

  getItems(){
    return this.ingredients.slice();
  }

  removeItem(index: number){
    this.ingredients.splice(index,1);
  }


  storeList(token:string){
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://recipe-book-5f58c.firebaseio.com/' + userId + '/sl.json',this.ingredients)
      .map((response: Response) => {

      });
  }
}
