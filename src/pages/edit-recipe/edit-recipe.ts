import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode: 'New';
  selectOptions = ['Easy','Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actCtrl: ActionSheetController,
    private alrtCtrl: AlertController
    ) {
  }



  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initForm();
  }


  private initForm(){
    this.recipeForm = new FormGroup({
      'title' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'difficulty' : new FormControl('Medium', Validators.required),
      'ingredients' : new FormArray([])
    })
  }

  onSubmit(){
    console.log("sfd",this.recipeForm)
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
        titlee: "Add",
        inputs:[
          {
            name: 'name',
            placeholder: "Name"
          }
        ],

        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Add',
            handler: data =>{
              if(data.name.trim() == '' || data.name == null){
                return;
              }
              (<FormArray>this.recipeForm.get('ingredients'))
                .push(new FormControl(data.name,Validators.required));
            }
          }
        ]
      });
    }




}
