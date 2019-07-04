import { Component, OnInit } from '@angular/core';
import { BleService } from '../../../services/ble.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ble-detail2',
  templateUrl: './ble-detail2.page.html',
  styleUrls: ['./ble-detail2.page.scss'],
})
export class BleDetail2Page implements OnInit {
  passedId:string;
  passedName:string;
  public sendarray:string = 'send null';
  public receivearray:string = 'get null';
  public nowtime:string = 'time';
  constructor(private bleservice:BleService,private alertCtrl: AlertController,private activateedRoute: ActivatedRoute) { }
  ngOnInit() { 
    this.passedId = this.activateedRoute.snapshot.paramMap.get('id');
    this.passedName = this.activateedRoute.snapshot.paramMap.get('name');
   // this.ble_connect();
  }  

  ble_connect(){
    this.bleservice.ble_connect(this.passedId).subscribe(
      next => console.log('next:', next),
      error => console.log('error:', error),
      () => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
    );
  }
  
  send_read_addr() {
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0XAA, 0XAA, 0X01, 0X02, 0X10, 0X01, 0xff, 0X55, 0X3C]);
    var checked = this.add_check_sum(array);  
    this.ble_sendData(checked);
  }

  send_write_time() {
    var date = new Date();
    this.nowtime = date.getFullYear().toString()+'/'+(date.getMonth()+1).toString()+'/'+date.getDate().toString()+' '+date.getHours().toString()+':'+date.getMinutes().toString()+':'+date.getSeconds().toString()
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X02, 0X09, 0X10, 0X03, 0x13,0x13,0x09,0x17,0x06,0x19,0x20, 0xff, 0X55, 0X3C]);
    let now_time_array = this.array2NowTime(array);
    let bcd_array =  this.array2BCDArray(now_time_array);
    let checked = this.add_check_sum(bcd_array);
    //let array = this.generate_frame(new Uint8Array(0x10),new Uint8Array([0XAA,0XAA]),new Uint8Array([0X01]),new Uint8Array([0X02]),new Uint8Array([0x10,0x01]),null) 
    this.ble_sendData(checked);
  }

  send_get_time() { 
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X02, 0X10, 0X04, 0xff, 0X55, 0X3C]);
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);
  }

  add_device(id:number,loc:string){

    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X02, 0X05, 0X10, 0X16, 0X03, 0X26, 0X00, 0xff, 0X55, 0X3C]);
    array[11]=id;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);
  }

  delete_device(id:number){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X02, 0X05, 0X10, 0X17, 0X03, 0X26, 0X00, 0xff, 0X55, 0X3C]);
    array[11]=id;    
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);
  }

  send_read_devices_number(){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X02, 0X10, 0X05, 0xff, 0X55, 0X3C]);
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);
  }

  send_read_one_device_addr(id:number){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X03, 0X10, 0X06, 0x00, 0xff, 0X55, 0X3C]);
    array[10]=id;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);    
  }
  
  send_read_one_device_realy(id:number){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X04, 0X10, 0X08, 0x00, 0x00,0xff, 0X55, 0X3C]);
    array[11]=id;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);    
  }

  send_write_one_device_realy(id:number,relays:number){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X02, 0X0E, 0X10, 0X07, 0x00, 0x00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0X00, 0xff, 0X55, 0X3C]);
    array[11] = id;
    array[13] = 1;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);  
  }

  send_read_one_device_mode(id:number){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X04, 0X10, 0X1A, 0x00, 0x00, 0xff, 0X55, 0X3C]);
    array[10]=id;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);    
  }
  send_write_one_device_mode(id:number,mode:number){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X02, 0X05, 0X10, 0X19, 0x00, 0x00, 0x00, 0xff, 0X55, 0X3C]);
    array[10]=id;
    array[12]=mode;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);    
  }

  send_read_one_device_auto(id:number,relay:number){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X05, 0X10, 0X0E, 0x00, 0x00, 0X00, 0xff, 0X55, 0X3C]);
    array[10] = id;
    array[12] = relay;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked); 
  }

  send_write_one_device_auto(id:number,id_bind:number,relay:number){//最长5段时间
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X02, 0X28, 0X10, 0X0D, 
                                0x00, 0x00, //控制节点
                                0X00, //继电器序号01-0a
                                0X02, //时间段数量00-ff
                                0X01, 0X00, 0X02, 0X00,0X03, 0X00, 0X04, 0X00,//时间段
                                0X00, 0X00, //绑定的节点
                                0X11, 0X11, 0X01, 0X12, 0X88, 0X00,//传感器1
                                0X22, 0X11, 0X01, 0X34, 0X88, 0X00,//传感器2
                                0X33, 0X11, 0X01, 0X56, 0X88, 0X00,//传感器3
                                0X44, 0X11, 0X01, 0X68, 0X88, 0X00,//传感器4
                                0xff, 0X55, 0X3C]);
    array[10] = id;
    array[12] = relay;
    array[22] = id_bind;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked); 
  }

  send_read_one_device_live(id:number){
    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X04, 0X10, 0X18, 0x00, 0x00, 0xff, 0X55, 0X3C]);
    array[10] = id;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);  
  }

  send_read_one_device_history(id:number,start:string,end:string){ //最长24小时

    let array = new Uint8Array([0XAA, 0X7E, 0XC3, 0X10, 0X00, 0X00, 0X01, 0X0E, 0X10, 0x15, 0x00, 0x00, 0x14, 0x13, 0x06, 0x1B, 0x00, 0x14, 0x13, 0x06, 0x1B, 0x10, 0xff, 0X55, 0X3C]);
    array[10] = id;
    let checked = this.add_check_sum(array);   
    this.ble_sendData(checked);  
  }


  ble_sendData(data:Uint8Array){
    this.bleservice.ble_sendData(data.buffer as ArrayBuffer).subscribe(
      next => {this.receivearray = next;this.sendarray = this.to16string(data)},
      error => console.log('error:', error),
      () => this.showAlert('Send Finish', 'already send!')
    );
  }

  add_check_sum(row_frame:Uint8Array){  //一个完整帧的check sum
    let sum:number = 0;
    for(var i=0;i<row_frame.length-3;i++){
      sum+=row_frame[i];
    }
    row_frame[row_frame.length-3] = sum%256;
    return row_frame;
  }

  to16string(typedArray){  //arraybuff to 16string seprate by ,
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

  array2BCDArray(dec: Uint8Array):Uint8Array{ //植物工厂完整帧的bcd转换
    // dec[4]= (dec[4] + (dec[4] / 10) * 6);
    // dec[5]= (dec[5] + (dec[5] / 10) * 6);
    for(var i=10;i<dec[7]+10-2;i++){
      dec[i]= (dec[i] + ((dec[i]-dec[i]%10) / 10) * 6);
    }
    return dec;
  }

  array2NowTime(dec: Uint8Array):Uint8Array{ //植物工厂写时间的实时时间赋值
    var date = new Date();
    this.nowtime = date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getDate().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()
    dec[10] = date.getSeconds();
    dec[11] = date.getMinutes();
    dec[12] = date.getHours();
    dec[13] = date.getDate();
    dec[14] = date.getMonth()+1;
    dec[15] = date.getFullYear()-2000;
    dec[16] = 0x14;
    return dec;
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

  async showAlert(title, message) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
