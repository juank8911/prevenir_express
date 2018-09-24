import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the SacarCitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sacar-cita',
  templateUrl: 'sacar-cita.html',
})
export class SacarCitaPage {
  fecha;
  today;
  maniana;
  tarde;
  hr:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private api : ApiProvider) {

    this.today = moment(new Date().toISOString()).format('YYYY-M-DD');
    this.horarios();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SacarCitaPage');
  }

  hola(){
    console.log("hola");
  }

  onDaySelect(ev)
  {
    console.log(ev);

    let numero = parseInt(ev.month)+1;
    this.fecha = ev.year + "-" + numero + "-" +ev.date;

     let today = new Date(this.today).getTime();
     let fecha = new Date(this.fecha).getTime();

      if(fecha >= today)
      {
        this.hr=false;
      }else{
        this.hr=true;
      }
      this.horarios();

  }

  horarios(){
    if(!this.fecha)
    {
      this.api.getHorario(this.today).subscribe((data)=>{
        let hors= data[0];
        this.maniana = hors.maniana;
        let hors2 = data[1];
        this.tarde = hors2.tardes;
        console.log(hors2);

      },(err)=>{console.log(err);});
    }else{
      this.api.getHorario(this.fecha).subscribe((data)=>{
        let hors= data[0];
        this.maniana = hors.maniana;
        let hors2 = data[1];
        this.tarde = hors2.tardes;

      },(err)=>{console.log(err);});
    }

  }


}
