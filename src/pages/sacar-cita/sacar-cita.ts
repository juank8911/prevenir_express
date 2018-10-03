import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { ApiProvider } from "../../providers/api/api";
import {Global} from '../../app/global';
import {HomePage} from '../home/home';

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
  ds:boolean = false;
  mn:boolean;
  td:boolean;
  id_servicio;
  id_usuario;
  f;
  val;
 
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private api : ApiProvider,
    private global : Global,private alertCtrl: AlertController,private toastCtrl:ToastController) {

    this.id_usuario= this.global.id_usuario;
    this.id_usuario = parseInt(this.id_usuario);
    this.id_servicio = this.navParams.get('id_servicio');
    // console.log(this.id_servicio);
    this.today = moment(new Date().toISOString()).format('YYYY-M-DD');
    this.horarios();
    
      
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SacarCitaPage');
    this.validacion();
    
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
      this.f = this.today;
      this.api.getHorario(this.today,this.id_servicio).subscribe((data)=>{
        console.log(data);
        let hors= data[0];
        this.maniana = hors.maniana;
        let hors2 = data[1];
        this.tarde = hors2.tardes;
    
        let dis = this.maniana[0]
        let dispo = this.tarde[0];
        if(dis.disponible === false){
          this.mn = true;
        }
        else{
          this.mn = false;
        }

        if(dispo.disponible === false){
          this.td = true;
        }
        else 
        {
          this.td = false;
        }
      
      },(err)=>{console.log(err);});
    }else{
      this.f = this.fecha;
      this.api.getHorario(this.fecha,this.id_servicio).subscribe((data)=>{
        console.log(data);
        let hors= data[0];
        this.maniana = hors.maniana;
        let hors2 = data[1];
        this.tarde = hors2.tardes;
        
       
        let dis = this.maniana[0];
        let dispo = this.tarde[0];
        if(dis.disponible === false){
          this.mn = true;
        }
        else{
          this.mn = false;
        }

        if(dispo.disponible === false){
          this.td = true;
        }
        else 
        {
          this.td = false;
        }

      },(err)=>{console.log(err);});
    }

  }

  sacarCita(hora,tarde){
   
    let alert = this.alertCtrl.create({
      title: 'Confirmacion',
      message: 'Estas seguro que deseas sacar una cita a las '+hora+" del "+this.f+
      ". Ten en cuenta que solo podras eliminar la cita 24 horas antes de la fecha elegida.",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
           
            if(!tarde)
              {
                console.log(this.val);
                if(this.val.datos === false){
                  this.presentToast('Por favor completa en "Mi cuenta" los campos requeridos antes de sacar la cita');
                     }
                     else{

                let h = hora.split(':');
                h = h[0];
                h = h + ":00:00"
                let start = this.f + " " + h;
                let info = {color:"#07a9df" , start:start,usuario:this.id_usuario,servicio:this.id_servicio};
                console.log(info);

                let today = moment(new Date().toISOString()).format('YYYY-M-DD HH:mm:ss');
                let today2 = moment(today);
                let st = moment(start);
                let hours = st.diff(today2, 'hours');
              
                if (hours < 2){
                  this.presentToast("No se puede sacar una cita 2 horas antes. Por favor escoge otro horario");
                }
                else 
                {
                  console.log(info);
                    this.api.guardarCita(info).then((data)=>{
                  console.log(data);
                  let a = data;
                  a = a[0].agregado;
                  if(true){
                    this.presentToast("Su cita fue agregada con exito, Revisa mis citas");
                    this.navCtrl.setRoot(HomePage);
                  }
                  
                  // else{
                  //   this.presentToast("Error en la conexion, intentalo mas tarde");
                  // }

                },(err)=>{
                  this.presentToast("Error en la conexion, intentalo mas tarde");
                });
                }

             
                 }
               }
          else{

            if(this.val.datos === false){
              this.presentToast('Por favor completa en "Mi cuenta" los campos requeridos antes de sacar la cita');
                 }
            else{
               let h = hora.split(':');
               h = h[0];
               h=  parseInt(h)+12; 
               h = h + ":00:00"
               let start = this.f + " " + h;
               let info = {color:"#07a9df" , start:start,usuario:this.id_usuario,servicio:this.id_servicio};
               console.log(info);


               let today = moment(new Date().toISOString()).format('YYYY-M-DD HH:mm:ss');
               let today2 = moment(today);
               let st = moment(start);
               let hours = st.diff(today2, 'hours');
               console.log(hours);
               if (hours < 2){
                 this.presentToast("No se puede sacar una cita 2 horas antes. Por favor escoge otro horario");
               }
               else{

                this.api.guardarCita(info).then((data)=>{
                let a = data;
                a = a[0].agregado;
                let b = data;
                b = b[0].reservado;
                console.log(data);
                
                if(b === true ){
                  this.presentToast("Ya tienes asignada una cita para este dia, revisa mis citas");
                }

                if(a === true){
                  this.presentToast("Su cita fue agregada con exito, Revisa tu historial de citas");
                  this.navCtrl.setRoot(HomePage);
                }
                
                
               },(err)=>{
                this.presentToast("Error en la conexion, intentalo mas tarde");
               });
               }
              }
           }
          }
        }
      ]
    });
    alert.present();
  }

  validacion(){
    // console.log(this.global.id_usuario);
    this.api.getValidacion(this.global.id_usuario).subscribe((data)=>{
      this.val = data;
      
    },(err)=>{console.log(err)});
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
