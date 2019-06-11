import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { ActivatedRoute } from '@angular/router';

// Bluetooth UUIDs
const SERVICE = 'fee0';
const CHARACTERISTIC = 'fee1';

@Component({
  selector: 'app-ble-detail',
  templateUrl: './ble-detail.page.html',
  styleUrls: ['./ble-detail.page.scss'],
})
export class BleDetailPage implements OnInit {
  peripheral: any = {};
  buttonState: string;
  state:string;
  statecount:number = 0;
  statusMessage: string;
  passedId =null;
  passedName =null;
  constructor(public navCtrl: NavController,
    private ble: BLE,
    private alertCtrl: AlertController,
    private ngZone: NgZone,
    private activateedRoute :ActivatedRoute) {
    }

  ngOnInit() {
    this.passedId = this.activateedRoute.snapshot.paramMap.get('id');
    this.passedName = this.activateedRoute.snapshot.paramMap.get('name');
    this.ble.connect(this.passedId).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
    );
  }

 // the connection to the peripheral was successful
 onConnected(peripheral) {

  this.peripheral = peripheral;
  this.setStatus('Connected to ' + (peripheral.name||peripheral.id));

  // this.ble.startNotification(this.peripheral.id, SERVICE, CHARACTERISTIC).subscribe(
  //   data => this.onStateChange(data), //FIXME:this is not working! question:how to debug ionic cordova?
  //   () => this.showAlert('Unexpected Error', 'Failed to subscribe for state changes')
  // )
  this.state =JSON.stringify(peripheral);

  this.ble.startNotification(this.peripheral.id, SERVICE, CHARACTERISTIC).subscribe(
    data => this.getData(data),
    () => this.showAlert('Unexpected Error', 'Failed to subscribe for data')
  )
  // this.ble.read(this.peripheral.id, SERVICE, CHARACTERISTIC).then(
  //   data => this.getData(data),
  //   () => this.showAlert('Unexpected Error', 'Failed to get temperature')  
  // )
}

sendData() {
  this.ble.write(this.peripheral.id, SERVICE, CHARACTERISTIC,this.arrayToBytes()).then(
    () => this.setStatus('SendDataButton'),
    e => this.showAlert('Unexpected Error', 'Error to send data！')
  );
}

getData(buffer:ArrayBuffer) {
  let string = this.bytesToString(buffer)
  this.ngZone.run(() => {
    this.buttonState = string;
  });
}

// Disconnect peripheral when leaving the page
ionViewWillLeave() {
  console.log('ionViewWillLeave disconnecting Bluetooth');
  this.ble.disconnect(this.peripheral.id).then(
    () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
    () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
  )
}

async showAlert(title, message) {
  let alert = await this.alertCtrl.create({
    header: title,
    message: message,
    buttons: ['OK']
  });
  alert.present();
}

setStatus(message) {
  console.log(message);
  this.ngZone.run(() => {
    this.statusMessage = message;
  });
}

  // ASCII only
  stringToBytes(string) {
    let array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
     }
    return array.buffer as ArrayBuffer;  //TODO:mark！！
 }

 arrayToBytes() {
  let array = new Uint8Array([0x31, 0x32, 0x33, 0x34]);
  return array.buffer as ArrayBuffer;
 }
 // ASCII only
 bytesToString(buffer) {
     return String.fromCharCode.apply(null, new Uint8Array(buffer));
 }

}
