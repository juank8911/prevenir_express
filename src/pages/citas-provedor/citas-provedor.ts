import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController,ToastController  } from 'ionic-angular';
import * as moment from 'moment';
import {ApiProvider} from '../../providers/api/api';
import {ModalCitaPage} from '../modal-cita/modal-cita';
import {Global} from '../../app/global';


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
    private modalCtrl: ModalController,private alertCtrl: AlertController, private global:Global,
    private toastCtrl:ToastController) {

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

  eliminar(idEvent){

    

    let alert = this.alertCtrl.create({
      title: 'Confirmación',
      message: '¿Estas seguro que deseas eliminar esta cita?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            
            this.api.dltCitaProvedor(idEvent,this.global.id_usuario).then((data)=>{
              console.log(data);
              let a = data;
              a = a[0].borrado;
              console.log(a);
              if (a === true){
                this.presentToast("Su cita fue eliminada con exito");
                this.horarios();
              }

            },(err)=>{
              console.log(err);
            });
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
