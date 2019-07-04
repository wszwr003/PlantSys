import { Component, OnInit } from '@angular/core';
import { BleService } from '../../../services/ble.service';

@Component({
  selector: 'app-auto-contrl',
  templateUrl: './auto-contrl.page.html',
  styleUrls: ['./auto-contrl.page.scss'],
})
export class AutoContrlPage implements OnInit {

  constructor(private bleservice:BleService) { }

  ngOnInit() { }

}
