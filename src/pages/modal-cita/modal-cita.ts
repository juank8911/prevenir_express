import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the ModalCitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-cita',
  templateUrl: 'modal-cita.html',
})
export class ModalCitaPage {
  info;
  event = {};
  servicio;
  hora;
  nombre;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {

     // this.info = moment(this.navParams.get('hora')).format('MMM Do YY');
     this.info = this.navParams.get('datos');
    //  this.hora = this.info[0];
    //  this.servicio = this.info[1];
     console.log("AQUIIIIII")
     this.nombre = this.info.servicio.nombre;
     console.log( this.info);

    // var preselectedDate = moment(this.hora).format('HH:mm:ss');

    
    this.event = {startTime :this.info.hora ,endTime:this.info.hora ,allDay:false};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoCitaPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }
  save(){
    this.viewCtrl.dismiss(this.event);
  }
}
