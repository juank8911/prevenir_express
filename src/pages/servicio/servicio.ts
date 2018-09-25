import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SacarCitaPage } from '../sacar-cita/sacar-cita';
import { PublicacionesProveedorPage } from '../publicaciones-proveedor/publicaciones-proveedor';
import {ApiProvider} from '../../providers/api/api';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import {Global} from '../../app/global';

/**
 * Generated class for the ServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html',
})
export class ServicioPage {
 
 public video;
 servicio : any;
 public id_prov;
 public prov;
//  public pv;
 public nombre;
 public nit;
 public descripcion;
 public logo;
 public id;
 private datos : FormGroup;
 public usr;
 service;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api:ApiProvider,private formBuilder: FormBuilder,private global : Global) {
      // this.user();
      this.servicio = navParams.get('servicio');
      console.log(this.servicio);
      this.getProveedor();

    this.datos = this.formBuilder.group({                 
      descripcion: ['',[Validators.required,Validators.minLength(15)]],    
    });
    if(!this.servicio.video){
      this.video = "https://www.youtube.com/embed/4Z4TxFh1tO8";
    }
    else{
      this.video= "https://www.youtube.com/embed/euZ7W4yE1Ks";
    }
   
    
  }

  user(){
      
      this.api.getUser(this.global.id_usuario).subscribe((data)=>{
        this.usr = data;
        console.log(this.usr);
      },(err)=>{console.log(err);});
  }

  ionViewDidLoad() {
    // this.api.getServicio(this.servicio.id_servicio).subscribe((data)=>{
    //   this.service = data;
    //   this.service = this.service[0];
    // },(err)=>{

    // });
  }

  getProveedor(){
    this.api.getProovedor(this.servicio.id_provedor).subscribe((data)=>{
      this.prov=data;
      this.prov = this.prov[0]

      this.nombre = this.prov.nombre;
      this.nit = this.prov.nit;
      this.descripcion = this.prov.descripcion;
      this.logo = this.global.apiUrl +this.prov.logo;
      this.id = this.prov.id_provedor;
      
    },(error)=>{
      console.log(error);
    });
  }

  usuario(){

  }

 

sacarCita(idProduct)
{
  this.navCtrl.push(SacarCitaPage,{id_servicio:idProduct});

}

goToMaspublicaciones(){
  // console.log(this.id);
  this.navCtrl.push(PublicacionesProveedorPage,{provedor:this.prov});
}

mensaje(){
  console.log("mensaje");
}


}
