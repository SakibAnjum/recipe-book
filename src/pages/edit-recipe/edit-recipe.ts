import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes";
import {Recipes} from "../../models/recipe";


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode: 'New';
  selectOptions = ['Easy','Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipes;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actCtrl: ActionSheetController,
    private alrtCtrl: AlertController,
    private recipesService: RecipesService,
    private tostCtrl: ToastController) {}



  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if(this.mode == 'Edit'){
      this.recipe = this.navParams.get('recipe')
      this.index = this.navParams.get('index')
    }
    this.initForm();
  }


  private initForm(){
    let title = null;
    let description = null;
    let defficulty = "Medium";
    let ingredients = [];

    if(this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      defficulty = this.recipe.difficulty;
      ingredients = this.recipe.ingredients;
      for(let ingredient of this.recipe.ingredients){
        ingredients.push(new FormControl(ingredient.name,Validators.required))
      }

    }

    this.recipeForm = new FormGroup({
      'title' : new FormControl(title, Validators.required),
      'description' : new FormControl(description, Validators.required),
      'difficulty' : new FormControl(defficulty, Validators.required),
      'ingredients' : new FormArray(ingredients)
    })
  }

  onSubmit(){
    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => {
        return { name: name, amount: 1}
      });
    }

    if(this.mode == 'Edit'){
      this.recipesService.updateRecipes(this.index,value.title,value.description,value.difficulty,value.ingredients)
    }else{
      this.recipesService.addRecipe(value.title,value.description,value.difficulty,value.ingredients)
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManage() {
    const actSheet = this.actCtrl.create({
      title: "what ddo you want to do?",
      buttons: [
        {
          text: 'Add',
          handler: () => {
            this.createNew().present();
          }
        },
        {
          text: 'Remove All',
          role: "destructive",
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len > 0){
              for (let i = len-1; i >=0; i--){
                fArray.removeAt(i);
              }
              const toast = this.tostCtrl.create({
                message: "All item removed",
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: "cancel"
        }
      ]
    });
    actSheet.present();
  }
    private createNew(){
      return this.alrtCtrl.create({
        title: "Add",
        inputs:[
          {
            name: 'name',
            placeholder: 'Name'
          },
        ],

        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Add',
            handler: data => {
              if(data.name.trim() == '' || data.name == null){
                const toast = this.tostCtrl.create({
                  message: "Pls Enter a valid value",
                  duration: 2000,
                  position: 'bottom'
                });
                toast.present();
                return;
              }
              (<FormArray>this.recipeForm.get('ingredients'))
                .push(new FormControl(data.name,Validators.required));
              const toast = this.tostCtrl.create({
                message: "Item Added",
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        ]
      });
    }




}


