import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Observable, of } from 'rxjs';

// Bluetooth UUIDs
const SERVICE = 'fee0';
const CHARACTERISTIC = 'fee1';

let receive_data_row:Uint8Array = new Uint8Array(30);
let receive_data:string ='';
let datas=[0,0,0,0];

@Injectable({
  providedIn: 'root'
})
export class BleService{
  passedId:string= null; //TODO: 有let和没let的区别
  peripheral: any = {};

  constructor(private ble: BLE) {

  }

  send_read_one_device_live(id:number):Observable<number[]>{
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X04, 0X10, 0X18, 0x00, 0x00, 0xff, 0X55, 0X3C]);
    array[10] = id;
    let checked = this.add_check_sum(array);   
    let arraybuffer = checked.buffer as ArrayBuffer
    this.ble_sendData(arraybuffer); 
    return of(datas);
  }

  send_write_one_device_realy(id:number,relays:number[]){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X02, 0X0E, 0X10, 0X07, 0x00, 0x00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0xff, 0X55, 0X3C]);
    array[10] = id;
    for (let i = 0; i < relays.length; i++) {
      array[12+i] = relays[i];
    }
    let checked = this.add_check_sum(array);  
    let arraybuffer = checked.buffer as ArrayBuffer 
    this.ble_sendData(arraybuffer);  
  }

  add_check_sum(row_frame:Uint8Array){  //一个完整帧的check sum
    let sum:number = 0;
    for(var i=0;i<row_frame.length-3;i++){
      sum+=row_frame[i];
    }
    row_frame[row_frame.length-3] = sum%256;
    return row_frame;
  }

  ble_connect(selected_BLE_ID:string): Observable<boolean> {
    this.passedId = selected_BLE_ID;
    this.ble.connect(this.passedId).subscribe(
      peripheral => this.onConnected(peripheral),
      () => {}
    );
    return of(true);
  }
  
  ble_sendData(data: ArrayBuffer): Observable<string> {
    var typedArray = new Uint8Array(data);
    var state:boolean;
    this.ble.write(this.peripheral.id, SERVICE, CHARACTERISTIC, data).then(
      () => {},
      e => {}
    );
    return of(receive_data)
  }

  // the connection to the peripheral was successful
  onConnected(peripheral) {
    this.peripheral = peripheral;
    this.ble.startNotification(this.peripheral.id, SERVICE, CHARACTERISTIC).subscribe(
      buffer => this.getData(buffer),
      () => console.log('ERROR!')
    );
    // this.ble.read(this.peripheral.id, SERVICE, CHARACTERISTIC).then(
    //   buffer => this.getData(buffer),
    //   () => console.log('ERROR!')
    // )
  }

  getData(buffer: ArrayBuffer){
    var typedArray = new Uint8Array(buffer);
    var string = this.to16string(typedArray);
    if(typedArray[0]==0xAA&&typedArray[1]==0x7E&&typedArray[2]==0xC3){
      if(receive_data_row[8]==0x10&&receive_data_row[9]==0x18&&receive_data_row[10]==0x33){
          datas[0] = ((receive_data_row[13]*256+receive_data_row[12])/10);
          datas[1] = ((receive_data_row[15]*256+receive_data_row[14])/10);
          datas[2] = receive_data_row[17]*256+receive_data_row[16];
          datas[3] = receive_data_row[19]*256+receive_data_row[18];
      }
      receive_data_row = typedArray;
      receive_data = string;
    }else{
      receive_data_row = this.appendArray(receive_data_row,typedArray);
      receive_data = receive_data + string;
    }
  }
  appendArray(buffer1:Uint8Array,buffer2:Uint8Array):Uint8Array{
    let tmp = new Uint8Array(buffer1.byteLength+buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1),0);
    tmp.set(new Uint8Array(buffer2),buffer1.byteLength);
    return tmp;
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
}
