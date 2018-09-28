import { Component, ViewChild } from '@angular/core';
import { NavController, Slides,NavParams } from 'ionic-angular';
import { CitasPage } from '../citas/citas';
import {Global} from '../../app/global';
import { Storage } from '@ionic/storage';
import {ApiProvider} from '../../providers/api/api';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

// @ViewChild(Slides) slides: Slides;
// goToSlide() {
// this.slides.slideTo(2, 500);
// }



esAdmin:any;
id_usuario:string;
imgUser:string;
userName:string;
user:any;
public mncps;
public mncpSelect;
public dptmSelect;
public dptms;
public cateSelect;
public ctgas;
public split;
busqueda:string="";
provedor;
usuario;
foto;
nombre;
info;





// slideChanged() {
//     let currentIndex = this.slides.getActiveIndex();
//     console.log('Current index is', currentIndex);
//   }

  

  constructor(public navCtrl: NavController,public global:Global, public navParams:NavParams, private api:ApiProvider) {
  
    this.id_usuario = localStorage.getItem("id");
    this.esAdmin = localStorage.getItem("admin");
    this.global.id_usuario = this.id_usuario;
    this.global.login = true;
    // this.imgUser = localStorage.getItem("userImg");
    // this.userName = localStorage.getItem("userName");
    if(this.esAdmin=="true")
    {
     this.global.admin=true;
     this.datosProvedor();
    }
    else{
      console.log("Entro aquiii!")
     this.global.admin=false;
     this.datosUser();
     
  }

  console.log("APPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP!")
  console.log(this.global);
 
  }

  departamentos(){
    this.api.getDepartamento()
  	.subscribe(
    (data)=>{
    this.dptms=data;
    // console.log(this.dptms)
  },
  	(error)=>{console.log(error);})
  }

  departamentoSelect(selectedValue: any){
    this.dptmSelect = selectedValue;
    console.log(selectedValue);
    this.api.getMunicipio(selectedValue).subscribe((data)=>{
      this.mncps = data;
      // console.log(data);
    },(error)=>{console.log(error);
    });
  }

  municipioSelect(selectedValue: any){
    this.mncpSelect = selectedValue;
    // console.log(this.mncpSelect);
  }

  
  categorias(){
    this.api.getCategorias()
  	.subscribe(
    (data)=>{this.ctgas=data;
    // console.log(this.ctgas)
  },
  	(error)=>{console.log(error);})
  }

  categoriaSelect(selectedValue: any){
    this.cateSelect = selectedValue;
    // console.log(this.cateSelect);
  }

  ionViewDidLoad() {
    this.departamentos();
    this.categorias();
  }

  misCitas()
  {
  	this.navCtrl.push(CitasPage);
  }

  buscar(){
    let consulta = {busqueda:this.busqueda,categoria:this.cateSelect, municipio:this.mncpSelect, departamento:this.dptmSelect};
    console.log(consulta);
  }

  datosUser(){
    this.api.getUser(this.global.id_usuario).subscribe((data)=>{
      // console.log("data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      this.usuario = data[0];
      this.global.infoPerfil = this.usuario;
  
      this.info = this.global.infoPerfil;
      this.foto = this.global.apiUrl+this.info.avatar;
      this.nombre = this.info.nombre;
      this.global.foto = this.foto;
      this.global.nombre = this.nombre;
  
      // console.log(this.global);
    },(err)=>{console.log(err)});
  }
  
  datosProvedor(){
    this.api.getProovedor(this.global.id_usuario).subscribe((data)=>{
      // console.log("data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      this.provedor = data[0];
      this.global.infoPerfil = this.provedor;
      
      this.info = this.global.infoPerfil;
      this.foto = this.global.apiUrl+this.info.avatar;
      this.nombre = this.info.nombre;
      this.global.foto = this.foto;
      this.global.nombre = this.nombre;
    
    },(err)=>{console.log(err)});
  }

}
