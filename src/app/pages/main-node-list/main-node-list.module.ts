import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainNodeListPage } from './main-node-list.page';
import { AddNodePopoverComponent } from './add-node-popover.component';

const routes: Routes = [
  {
    path: '',
    component: MainNodeListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainNodeListPage,AddNodePopoverComponent],
  entryComponents: [AddNodePopoverComponent]  //TODO:why without this the popover component doesnt work

})
export class MainNodeListPageModule {}
