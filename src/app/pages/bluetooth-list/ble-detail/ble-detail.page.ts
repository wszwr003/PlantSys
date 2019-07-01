import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { ActivatedRoute } from '@angular/router';

// Bluetooth UUIDs
const SERVICE = 'fee0';
const CHARACTERISTIC = 'fee1';
let addr_string = '';
@Component({
  selector: 'app-ble-detail',
  templateUrl: './ble-detail.page.html',
  styleUrls: ['./ble-detail.page.scss'],
})
export class BleDetailPage implements OnInit {
  peripheral: any = {};
  buttonState: string;
  buttonState2: string;
  state: string;
  statecount: number = 0;
  statusMessage: string;
  passedId = null;
  passedName = null;
  constructor(
    public navCtrl: NavController,
    private ble: BLE,
    private alertCtrl: AlertController,
    private ngZone: NgZone,
    private activateedRoute: ActivatedRoute) {
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
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

    // this.ble.startNotification(this.peripheral.id, SERVICE, CHARACTERISTIC).subscribe(
    //   data => this.onStateChange(data), //FIXME:this is not working! question:how to debug ionic cordova?
    //   () => this.showAlert('Unexpected Error', 'Failed to subscribe for state changes')
    // )
    this.state = JSON.stringify(peripheral);

    this.ble.startNotification(this.peripheral.id, SERVICE, CHARACTERISTIC).subscribe(
      data => this.getData(data),
      () => this.showAlert('Unexpected Error', 'Failed to subscribe for data')
    )
    // this.ble.read(this.peripheral.id, SERVICE, CHARACTERISTIC).then(
    //   data => this.getData(data),
    //   () => this.showAlert('Unexpected Error', 'Failed to get temperature')  
    // )
  }

  sendData(data: ArrayBuffer) {
    var typedArray = new Uint8Array(data);
    this.ngZone.run(() => {
      this.buttonState = this.to16string(typedArray);
    });
    this.ble.write(this.peripheral.id, SERVICE, CHARACTERISTIC, data).then(
      () => this.setStatus('SendDataButton'),
      e => this.showAlert('Unexpected Error', 'Error to send data！')
    );
  }

  to16string(typedArray){
    let string:string = '';
    for (let index = 0; index < typedArray.length; index++) {
      let tmp2 = typedArray[index]%16
      let tmp1 = ((typedArray[index]-tmp2)/16)
      if (tmp1<10) {
        string =string + tmp1.toString();
      }else if(tmp1==10){
        string =string + 'a';
      }else if(tmp1==11){
        string =string + 'b';
      }else if(tmp1==12){
        string =string + 'c';
      }else if(tmp1==13){
        string =string + 'd';
      }else if(tmp1==14){
        string =string + 'e';
      }else if(tmp1==15){
        string =string + 'f';
      }
      if (tmp2<10) {
        string =string + tmp2.toString();
      }else if(tmp2==10){
        string =string + 'a';
      }else if(tmp2==11){
        string =string + 'b';
      }else if(tmp2==12){
        string =string + 'c';
      }else if(tmp2==13){
        string =string + 'd';
      }else if(tmp2==14){
        string =string + 'e';
      }else if(tmp2==15){
        string =string + 'f';
      }
      string =string + ',';
    }
    return string;
  }

  getData(buffer: ArrayBuffer) {
    //let string = this.bytesToString(buffer);
    var typedArray = new Uint8Array(buffer);
    this.ngZone.run(() => {
      //this.buttonState = string;
      this.buttonState2 = this.to16string(typedArray);
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


  send_read_addr() {

    let sum = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0XAA, 0XAA, 0X01, 0X02, 0X10, 0X01]);
    var check_sum = this.add_check_sum(sum);  
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0XAA, 0XAA, 0X01, 0X02, 0X10, 0X01, check_sum, 0X55, 0X3C]);
    // this.buttonState = check_sum.toString(); 
    //let array = this.generate_frame(new Uint8Array(0x10),new Uint8Array([0XAA,0XAA]),new Uint8Array([0X01]),new Uint8Array([0X02]),new Uint8Array([0x10,0x01]),null) 
    this.sendData(array.buffer as ArrayBuffer);
  }
  send_write_time() {
    let sum = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X02, 0X09, 0X10, 0X03, 0x13,0x09,0x17,0x06,0x19,0x20]);
    var check_sum = this.add_check_sum(sum);
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X02, 0X09, 0X10, 0X03,0x13,0x09,0x17,0x06,0x19,0x20,check_sum, 0X55, 0X3C]);
    //let array = this.generate_frame(new Uint8Array(0x10),new Uint8Array([0XAA,0XAA]),new Uint8Array([0X01]),new Uint8Array([0X02]),new Uint8Array([0x10,0x01]),null) 
    this.sendData(array.buffer as ArrayBuffer);
  }
  send_get_time() { 
    let sum = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X02, 0X10, 0X04]);
    var check_sum = this.add_check_sum(sum);   
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X02, 0X10, 0X04, check_sum, 0X55, 0X3C]);
    this.sendData(array.buffer as ArrayBuffer);
  }

  generate_frame(kind:Uint8Array,addr:Uint8Array,ctrl:Uint8Array,length:Uint8Array,mark:Uint8Array,data:Uint8Array){
    let head = new Uint8Array([0XAA, 0X7E, 0XC3]);
    let tail = new Uint8Array([0X55, 0X3C]);
    let check:Uint8Array;
    let row_frame = new Uint8Array(head.length + kind.length + addr.length + ctrl.length + length.length + mark.length + data.length);
    let frame:Uint8Array;
    row_frame.set(head);
    row_frame.set(kind,head.length);
    row_frame.set(addr,head.length + kind.length);
    row_frame.set(ctrl,head.length + kind.length + addr.length);
    row_frame.set(length,head.length + kind.length + addr.length + ctrl.length);
    row_frame.set(mark,head.length + kind.length + addr.length + ctrl.length + length.length);
    row_frame.set(data,head.length + kind.length + addr.length + ctrl.length + length.length + mark.length);
    //check = this.add_check_sum(row_frame);
    frame = new Uint8Array(row_frame.length+check.length+tail.length);
    frame.set(row_frame);
    frame.set(check,row_frame.length);
    frame.set(tail,row_frame.length+check.length);
    return frame;
  }

  add_check_sum(row_frame:Uint8Array){
    let sum:number = 0;
    row_frame.forEach(element => {
      sum+=element;
    });
    sum = sum%256;
    return sum;
  }


  BCD2DEC(bcd: Uint8Array): Uint8Array {
    bcd.forEach(element => {
      element=(element - (element >> 4) * 6);
    });
    return bcd;
  }

  DEC2BCD(dec: Uint8Array): Uint8Array {
    dec.forEach(element => {
      element= (element + (element / 10) * 6);
    });
    return dec;
  }
}
