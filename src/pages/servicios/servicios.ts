import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController,Loading,
  LoadingController,ToastController} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ServicioPage } from '../servicio/servicio';
import {PopoverFiltroPage} from '../popover-filtro/popover-filtro';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider,
    private popoverCtr : PopoverController,public loadingCtrl: LoadingController,private toastCtrl:ToastController) {

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
      this.loading.dismiss();
      console.log(this.services);
    },(error)=>{
      this.loading.dismiss();
      this.presentToast("Error en la conexión intentalo más tarde")
      console.log(error);
    });
  }

      getItems(ev: any) {

   
     const val = ev.target.value;
     if (val && val.trim() != '') {
      this.services = this.services.filter((servicio) => {
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
