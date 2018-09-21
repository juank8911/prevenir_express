import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {Global} from '../../app/global';
import {ServicioPage} from '../servicio/servicio';

/**
 * Generated class for the PublicacionesProveedorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicaciones-proveedor',
  templateUrl: 'publicaciones-proveedor.html',
})
export class PublicacionesProveedorPage {
public proveedor;
public publicaciones;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api:ApiProvider,
              private global:Global) {
    this.proveedor = this.navParams.get('provedor');
    console.log(this.proveedor);
    
  }
  goToService(servicio){
    this.navCtrl.push(ServicioPage,{servicio:servicio})
  }

  ionViewDidLoad() {
    let id = this.global.id_usuario;
    this.api.getPublicacionesProveedor(id).subscribe((res)=>{
      this.publicaciones = res;
      console.log(this.publicaciones);
    },(err)=>{
      console.log(err);
    });
  }

}
