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
public url;
public inf =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private api:ApiProvider,
              private global:Global) {
    this.proveedor = this.navParams.get('provedor');
    console.log(this.proveedor);
    
  }
  goToService(servicio){
    this.navCtrl.push(ServicioPage,{servicio:servicio})
  }

  ionViewDidLoad() {
    let id = this.proveedor.id_provedor;
    this.api.getPublicacionesProveedor(id).subscribe((res)=>{
      this.publicaciones = res;
      this.info();
      console.log(this.publicaciones);
    },(err)=>{
      console.log(err);
    });
  }

  info(){

    for(var i = 0; i < this.publicaciones.length; i ++){
     
      let categoria = this.publicaciones[i].categoria;
      let duracion = this.publicaciones[i].duracion;
      let descuento = this.publicaciones[i].descuento;
      let nombre = this.publicaciones[i].nombre;
      let precio = this.publicaciones[i].precio;
      let descripcion = this.publicaciones[i].descripcion;
      let fot = this.publicaciones[i];
      let id_servicios = this.publicaciones[i].id_servicios;
      let id_provedores = this.publicaciones[i].id_provedores;
      let precio_cliente_prevenir = this.publicaciones[i].precio_cliente_prevenir;
      let video = this.publicaciones[i].video;
      let fotos = this.publicaciones[i].foto;
      
      fot = fot.foto[0];
      fot = this.url+fot.ruta;
      
      this.inf.push({categoria:categoria,descuento:descuento,nombre:nombre,descripcion:descripcion,foto:fot,
                      id_servicio:id_servicios,id_provedores:id_provedores, duracion:duracion,precio:precio,
                      precio_cliente_prevenir:precio_cliente_prevenir, video:video, fotos:fotos });
    }
    console.log(this.inf);
  }

}
