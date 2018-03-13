import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-sl-options',
  template: `
    <ion-grid>
      <ion-row>
        <ion-col>
          <h3>Store & Load</h3>
        </ion-col>
      </ion-row>
      
      <ion-row>
        
        <ion-col>
          <button outline ion-button (click)="onAction('load')">Load List</button>
        </ion-col>
        
        <ion-col>
          <button outline ion-button (click)="onAction('store')">Save List</button>
        </ion-col>
        
      </ion-row>
    </ion-grid>
  `
})
export class SlOptions{
  constructor(
    private viewCtrl: ViewController
  ){}


  onAction(act: string){
    this.viewCtrl.dismiss({action: act});
  }
}
