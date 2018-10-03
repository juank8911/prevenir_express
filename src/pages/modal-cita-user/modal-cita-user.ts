import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {Global} from '../../app/global';

/**
 * Generated class for the ModalCitaUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-cita-user',
  templateUrl: 'modal-cita-user.html',
})
export class ModalCitaUserPage {
info;
infoServicio;
infoProvedor;
avatar;
nombreProvedor;
telefonoProvedor;
direccionProvedor;
correoProvedor;


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    private api:ApiProvider, private global : Global) {

    this.info = this.navParams.get('info');
    console.log(this.info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCitaUserPage');
    this.getServicio();
  }

  getServicio()
  {
    this.api.getServicio(this.info.id_servicio).subscribe((data)=>{
      this.infoServicio = data;
      this.infoServicio = this.infoServicio[0];
      let provedor = this.infoServicio.id_provedores;
      this.getProvedor(provedor);
    },(err)=>{
      console.log(err);
    });

    
  }

  getProvedor(id){
    
    this.api.getProovedor(id).subscribe((data)=>{
      this.infoProvedor = data;
      this.infoProvedor = this.infoProvedor[0];

      console.log(this.infoProvedor);
      this.avatar = this.global.apiUrl+this.infoProvedor.avatar;
      this.nombreProvedor = this.infoProvedor.nombre;
      this.telefonoProvedor = this.infoProvedor.telefono;
      this.direccionProvedor = this.infoProvedor.direccion;
      this.correoProvedor = this.infoProvedor.correo;


    },(err)=>{
      console.log(err);
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }
  save(){
    this.viewCtrl.dismiss();
  }

}
