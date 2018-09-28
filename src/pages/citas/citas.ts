import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {Global} from '../../app/global';
import * as moment from 'moment';
import {CitasProvedorPage} from '../citas-provedor/citas-provedor';

/**
 * Generated class for the CitasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html',
})
export class CitasPage {
  usuario_id;
  citas;
  inf = [];
  servicio = [];
  servicios;
  url;
  foto;

 

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider,
    private global:Global) {
    this.usuario_id = this.global.id_usuario;
    this.usuario_id = parseInt(this.usuario_id);
    this.url = this.global.apiUrl;
    if(this.global.admin === true){
         this.getServicios();
    }else{
      this.getCitas();
    }

  }

  ionViewDidLoad() {
    
  }

  getServicios(){
    let id = parseInt(this.global.id_usuario);
    this.api.getPublicacionesProveedor(id).subscribe((data)=>{
      this.servicios = data;
      console.log(this.servicios);
      this.getFoto();
    },(err)=>{
      console.log(err);
    });
  }

  getCitas(){
    this.api.getCitasUsuario(this.usuario_id).subscribe((data)=>{
      this.citas = data;
      console.log(this.citas);
      
      // let p = this.citas[0];
      // p = moment(p.start).format('DD-M-YYYY HH:mm:ss a');
      // p = p.split(' ');
      // console.log(p);
      this.info();
    },(err)=>{
      console.log(err);
    });
  }

  getFoto(){
    console.log("OEEEE");
    for(var i = 0 ; i < this.servicios.length; i++)
    {
      let foto = this.servicios[i].foto;
      let f = this.servicios[i];
      let nombre = this.servicios[i].nombre
      let id = this.servicios[i].id_servicios;
      let descripcion = this.servicios[i].descripcion;
      f = f.foto[0];
      f = this.url+f.ruta;
      this.foto = f;

      this.servicio.push({id_servicios:id, nombre:nombre, foto:f, descripcion:descripcion});
    }
    console.log(this.servicio);
  }
  
  info(){
    console.log("AQUI");
    for(var i = 0; i < this.citas.length; i ++){
      
      let p = this.citas[i];
      p = moment(p.start).format('DD-M-YYYY hh:mm a');
      p = p.split(' ');
      let p1 = p[0];
      let p2 = p[1];
      p2 = p2 +" "+ p[2];
      let id_servicio = this.citas[i].servicios_idservicios;
      let nombre = this.citas[i].nombre;
      let id_eventos = this.citas[i].id_eventos;

      this.inf.push({fecha:p1, hora: p2, id_servicio:id_servicio,nombre:nombre,id_eventos:id_eventos});

    }
     
    console.log(this.inf);
    }

    eliminar(id){
      this.api.dltCita(id).then((data)=>{
        console.log(data);
      },(err)=>{console.log(err)});
    }


    ver(id){
      console.log(id);
    }

    verCitas(id,nombre){
      this.navCtrl.push(CitasProvedorPage,{id_servicios:id, nombre:nombre});
    }
  
}
