import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import * as moment from 'moment';
import {ApiProvider} from '../../providers/api/api';
import {ModalCitaPage} from '../modal-cita/modal-cita';


/**
 * Generated class for the CitasProvedorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-citas-provedor',
  templateUrl: 'citas-provedor.html',
})
export class CitasProvedorPage {
  public id_servicios;
  hr:boolean = false;
  information;
  maniana;
  tarde;
  fecha;
  today;
  f;
  nombre;

  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider,
    private modalCtrl: ModalController) {

    this.id_servicios = this.navParams.get('id_servicios');
    this.nombre = this.navParams.get('nombre');
    console.log(this.id_servicios + " " + this.nombre);
    this.today = moment(new Date().toISOString()).format('YYYY-M-DD');
    this.horarios();
  }

  ionViewDidLoad() {
   
  }

  toggleSection(i) {
    this.maniana[i].open = !this.maniana[i].open;
  }

  toggleSection2(i) {
    this.tarde[i].open = !this.tarde[i].open;
  }
 
  toggleItem(i, j) {
    this.maniana[i].children[j].open = !this.maniana[i].children[j].open;
  }

  onDaySelect(ev){
    

    let numero = parseInt(ev.month)+1;
    this.fecha = ev.year + "-" + numero + "-" +ev.date;
    console.log("on day selet")
    console.log(this.fecha);
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
      this.f = this.today;
      this.api.getCitasMedico(this.f,this.id_servicios).subscribe((data)=>{
        console.log(data);
        this.information = data;
  
        let ma = this.information[0];
        ma = ma.maniana;
        this.maniana = ma;
  
        let ta = this.information[1];
        ta = ta.tardes;
        this.tarde = ta;
        
      },(err)=>{
        console.log(err);
      });
    }else{
      this.f = this.fecha;
      this.api.getCitasMedico(this.f,this.id_servicios).subscribe((data)=>{
        console.log(data);
        this.information = data;
  
        let ma = this.information[0];
        ma = ma.maniana;
        this.maniana = ma;
  
        let ta = this.information[1];
        ta = ta.tardes;
        this.tarde = ta;
        
      },(err)=>{
        console.log(err);
      });
    }
  }

  verCita(info){
    let modal = this.modalCtrl.create(ModalCitaPage,{info:info});
        modal.present();

        modal.onDidDismiss((data)=>{
          console.log(data);
        });
    console.log(info);
  }

}
