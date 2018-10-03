import { Component, ViewChild } from '@angular/core';
import { NavController, Slides,NavParams,ToastController,Loading,
  LoadingController } from 'ionic-angular';
import { CitasPage } from '../citas/citas';
import {Global} from '../../app/global';
import { Storage } from '@ionic/storage';
import {ApiProvider} from '../../providers/api/api';
import {ListadoPublicacionesPage} from '../listado-publicaciones/listado-publicaciones';
import {ServiciosPage} from '../servicios/servicios'
 
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
// busqueda:string="";
provedor;
usuario;
foto;
nombre;
info;
loading: Loading;




// slideChanged() {
//     let currentIndex = this.slides.getActiveIndex();
//     console.log('Current index is', currentIndex);
//   }

  

  constructor(public navCtrl: NavController,public global:Global, public navParams:NavParams, private api:ApiProvider,
    private toastCtrl:ToastController,public loadingCtrl: LoadingController) {
  

 
  }
  ionViewDidEnter() {
    this.inicio();

    
}

  inicio(){
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
      // console.log("Entro aquiii!")
     this.global.admin=false;
     this.datosUser();
     
  }

  // console.log("APPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP!")
  console.log(this.global);
  }

  adminServs(){
    this.navCtrl.push(ListadoPublicacionesPage);
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
    // console.log(selectedValue);
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

    if(!this.mncpSelect){
        this.presentToast("Selecciona un municipio");
    }else{
      // busqueda:this.busqueda,
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: "Espera un momento<br>estamos cargando información... ",
        duration: 3000
      });
      this.loading.present();
      this.api.getBusqueda(this.mncpSelect,0).subscribe((data)=>{
        console.log(data);
        let a = data[0];
        if(a.vacio === true){
          this.loading.dismiss();
          this.navCtrl.push(ServiciosPage,{servicios:data,vacio:true});
        }else{
          this.loading.dismiss();
          this.navCtrl.push(ServiciosPage,{servicios:data, vacio:false});
        }
        
      },(err)=>{
        console.log(err);
      });

    }
    
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  datosUser(){
    this.api.getUser(this.global.id_usuario).subscribe((data)=>{
      // console.log("data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      this.usuario = data[0];
      this.global.infoPerfil = this.usuario;
  
      this.info = this.global.infoPerfil;
      this.foto = this.info.avatar;
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
