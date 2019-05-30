import { Component } from '@angular/core';

@Component({
  selector: 'app-air-contrl',
  templateUrl: './air-contrl.page.html',
  styleUrls: ['./air-contrl.page.scss'],
})
export class AirContrlPage {
  public url_list: string = '/list';
  public url_contrl_time: string = '/contrl-time';
  public url_contrl_condition: string = '/contrl-condition';
  public states_dis = ["已开启", "已开启", "已开启", "已开启", "已开启", "已开启", "已关闭", "已关闭", "已关闭", "已关闭"]
  public locate_icon_class = ["icon-state-location0 icon-state-size",
    "icon-state-location1 icon-state-size",
    "icon-state-location2 icon-state-size",
    "icon-state-location3 icon-state-size",
    "icon-state-location4 icon-state-size",
    "icon-state-location5 icon-state-size",
    "icon-state-location6 icon-state-size",
    "icon-state-location7 icon-state-size",
    "icon-state-location8 icon-state-size",
    "icon-state-location9 icon-state-size"]
  constructor() { 
  }

  onSelect(buttion_state: String, num: number): void {
    if (buttion_state === "已开启") {
      this.states_dis[num] = "已关闭";

    }
    else {
      this.states_dis[num] = "已开启";
    }
  }
  onIcon(buttion_state: String): String {
    if (buttion_state === "已开启") {
      return "./assets/open.png";
    }
    else {
      return "./assets/close.png";
    }
  }
}

