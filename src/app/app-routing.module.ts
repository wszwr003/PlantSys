import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainTabsPage } from './pages/main-tabs/main-tabs.page';

const routes: Routes = [
  { path: '', redirectTo: 'main-tabs/bluetooth-list', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  {
    path: 'main-tabs', component: MainTabsPage,
    children: [
      {
        path: 'main-node-list',
        loadChildren: './pages/main-node-list/main-node-list.module#MainNodeListPageModule'
      },
      {
        path: 'main-deployed',
        loadChildren: './pages/main-deployed/main-deployed.module#MainDeployedPageModule'
      },
      {
        path: 'bluetooth-list',
        loadChildren: './pages/bluetooth-list/bluetooth-list.module#BluetoothListPageModule'
        
      }
    ]
  },
  { path: 'air-contrl/:id', loadChildren: './pages/air-contrl/air-contrl.module#AirContrlPageModule' },
  { path: 'auto-contrl', loadChildren: './pages/air-contrl/auto-contrl/auto-contrl.module#AutoContrlPageModule' },
  { path: 'air-collect/:id', loadChildren: './pages/air-collect/air-collect.module#AirCollectPageModule' },
  { path: 'water/:id', loadChildren: './pages/water/water.module#WaterPageModule' },
  { path: 'ble-detail/:id/:name',  loadChildren: './pages/bluetooth-list/ble-detail/ble-detail.module#BleDetailPageModule' },
  { path: 'ble-detail2/:id/:name', loadChildren: './pages/bluetooth-list/ble-detail2/ble-detail2.module#BleDetail2PageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
