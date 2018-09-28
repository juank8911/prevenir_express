import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { Global } from '../../app/global';
import { ApiProvider } from '../../providers/api/api';
{}
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
  usuarios_id;
  user;
  nombre;
  apellido;
  fechaNacimiento;
  contacto;
  correo;
  avatar;


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    private global:Global, private api:ApiProvider) {
     this.info = this.navParams.get('info');
    
    //  [i]
     this.usuarios_id = this.info.usuarios_id;
     this.paciente();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoCitaPage');
  }

  paciente() {
    this.api.getUser(this.usuarios_id).subscribe((data)=>{
      console.log("AQUIIII");
      this.user = data[0];
      this.nombre= data[0].nombre;
      this.apellido = data[0].apellidos;
      this.fechaNacimiento = data[0].feha_nacimiento;
      this.fechaNacimiento = moment(this.fechaNacimiento).format('DD-MM-YYYY');
      this.contacto = data[0].telefonowatshapp;
      this.correo = data[0].correo;
      this.avatar = this.global.apiUrl+data[0].avatar;
      
    },(err)=>{console.log(err)});
  }


  close(){
    this.viewCtrl.dismiss();
  }
  save(){
    this.viewCtrl.dismiss();
  }
}
