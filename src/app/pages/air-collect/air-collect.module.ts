import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AirCollectPage } from './air-collect.page';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: AirCollectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChartsModule   //TODO: ATTENTION!
  ],
  declarations: [AirCollectPage]
})

export class AirCollectPageModule {

}
