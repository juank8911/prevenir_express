import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController,Loading,
  LoadingController,ToastController} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ServicioPage } from '../servicio/servicio';
import {PopoverFiltroPage} from '../popover-filtro/popover-filtro';
import {Global} from '../../app/global';

/**
 * Generated class for the ServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {
  services //varible para cargar los datos de servicio
 ServicePage;
 loading: Loading;
 busqueda :string ="";
 inf = [];
 url;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider,
    private popoverCtr : PopoverController,public loadingCtrl: LoadingController,private toastCtrl:ToastController,
    private global : Global) {

      this.url = this.global.apiUrl;

  }

  ionViewDidLoad() {
    this.servicios();
  }

  servicios(){
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: "Espera un momento<br>estamos cargando información... ",
      duration: 3000
    });
    this.loading.present();
    this.api.getServicios().subscribe((data)=>{
      this.services=data;
      // console.log(this.services);
      this.info();
      this.loading.dismiss();
      
    },(error)=>{
      this.loading.dismiss();
      this.presentToast("Error en la conexión intentalo más tarde")
      console.log(error);
    });
  }

  info(){

    for(var i = 0; i < this.services.length; i ++){
     
      let categoria = this.services[i].categoria;
      let duracion = this.services[i].duracion;
      let descuento = this.services[i].descuento;
      let nombre = this.services[i].nombre;
      let precio = this.services[i].precio;
      let descripcion = this.services[i].descripcion;
      let fot = this.services[i];
      let id_servicios = this.services[i].id_servicios;
      let id_provedores = this.services[i].id_provedores;
      let precio_cliente_prevenir = this.services[i].precio_cliente_prevenir;
      let video = this.services[i].video;
      let fotos = this.services[i].foto;
      
      fot = fot.foto[0];
      fot = this.url+fot.ruta;
      
      this.inf.push({categoria:categoria,descuento:descuento,nombre:nombre,descripcion:descripcion,foto:fot,
                      id_servicio:id_servicios,id_provedores:id_provedores, duracion:duracion,precio:precio,
                      precio_cliente_prevenir:precio_cliente_prevenir, video:video, fotos:fotos });
    }
    console.log(this.inf);
  }

      getItems(ev: any) {

   
     const val = ev.target.value;
     if (val && val.trim() != '') {
      this.inf = this.inf.filter((servicio) => {
       return (servicio.nombre.toLowerCase() && servicio.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
     }
     
     );
    }else{
      this.servicios();
    }


}

cancel(ev:any){
  this.servicios();
 }

  
  goToServicio(servicio)
  {
    console.log(servicio);
    this.navCtrl.push(ServicioPage,{servicio:servicio})
  }

  popover(event){
    let popover = this.popoverCtr.create(PopoverFiltroPage);
    popover.present({ev : event});
    popover.onDidDismiss((data)=>{
      console.log(data);
    });
  } 

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
