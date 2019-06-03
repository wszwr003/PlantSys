import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AddNodePopoverComponent } from './add-node-popover.component';
import { NODES , LOCATIONS } from '../../data/nodes-mock';
@Component({
  selector: 'app-main-node-list',
  templateUrl: './main-node-list.page.html',
  styleUrls: ['./main-node-list.page.scss'],
})
export class MainNodeListPage {
  iscard:boolean = true;
  selectedLoc:string;
  public url_contrl:string = '/contrl';
  public url_collect:string = '/collect';
  public url_water:string = '/water';
  public url_alarm:string = '/alarm';
  public url_history:string = '/history';
  num:number = 4;
  node:any;
  public cards = NODES;
  public locs = LOCATIONS;
  constructor(public popoverController: PopoverController) { 
    this.selectedLoc = "所有节点";
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddNodePopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  changeview(){
    this.iscard=!this.iscard;
  }
  addnode(){
    this.cards.push({name:"环境采集节点",addr:"ID:3004",kind:"collect",loc:"实验室3",loc2:"3",x:1,y:1});
  }
  removenode(){
    this.cards.pop();
  }
  selectLoc(event:any){
    console.log(event);
    this.selectedLoc = event.target.text;
  }
}