import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController} from 'ionic-angular';
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
 busqueda :string ="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider,
    private popoverCtr : PopoverController) {

  }

  ionViewDidLoad() {
    this.servicios();
  }

  servicios(){
    this.api.getServicios().subscribe((data)=>{
      this.services=data;
      console.log(this.services);
    },(error)=>{
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
}
