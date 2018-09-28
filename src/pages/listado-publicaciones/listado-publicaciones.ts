import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController , ToastController,Loading,
  LoadingController} from 'ionic-angular';
import{PublicarServicioPage} from '../publicar-servicio/publicar-servicio';
import {ApiProvider} from '../../providers/api/api';
import {Global} from '../../app/global';
import {ServicioPage} from '../servicio/servicio';
 
/**
 * Generated class for the ListadoPublicacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado-publicaciones',
  templateUrl: 'listado-publicaciones.html',
})
export class ListadoPublicacionesPage {

  public publicaciones;
  public res;
  public token;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider,
    private global:Global,private alertCtrl: AlertController,private toastCtrl:ToastController,
    public loadingCtrl: LoadingController) {
      
  }

  ionViewDidLoad() {
    
  
  }

  ionViewDidEnter() {
    this.getPublicaciones();
}
  
  getPublicaciones(){
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: "Espera un momento<br>estamos cargando información... ",
      duration: 3000
    });
    this.loading.present();
    let id = this.global.id_usuario;
    this.api.getPublicacionesProveedor(id).subscribe((res)=>{
      this.publicaciones = res;
      this.loading.dismiss();
      console.log(this.publicaciones);
    },(err)=>{
      this.loading.dismiss();
      this.presentToast("Error en la conexión intentalo más tarde");
      console.log(err);
    });
  }

  updateService(pub){
    this.navCtrl.push(PublicarServicioPage,{pub:pub});
  }

  viewService(servicio){
    this.navCtrl.push(ServicioPage,{servicio:servicio})
  }

  presentConfirm(id) {
    
    let alert = this.alertCtrl.create({
      title: 'Eliminar',
      message: '¿Esta seguro que desea eliminar esta publciación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {

            this.loading = this.loadingCtrl.create({
              spinner: 'hide',
              content: "Espera un momento<br>estamos procesando tu solicitud... ",
              duration: 15000
            });
            this.loading.present();
              this.api.dltService(id).then((data)=>{
              this.res = data;
              console.log("AQUIIIIIIII")
              console.log("//////////////////  "+this.res);
              this.loading.dismiss();
              this.presentToast("La publicación se ha eliminado exitosamente");
              this.getPublicaciones();
              
            },(err)=>{
              console.log(err);
              this.loading.dismiss();
              this.presentToast("Error al eliminar intentalo mas tarde");
            });

          
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  crearPublicacion(){
    this.navCtrl.push(PublicarServicioPage);
  }
}
