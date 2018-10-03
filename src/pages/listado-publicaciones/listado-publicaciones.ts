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
  public inf=[];
  public url;
  mostrar:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider,
    private global:Global,private alertCtrl: AlertController,private toastCtrl:ToastController,
    public loadingCtrl: LoadingController) {
      
      this.url = global.apiUrl;
  }

  ionViewDidLoad() {
    
  
  }

  ionViewDidEnter() {
    this.inf=[];
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
      
      this.loading.dismiss();
     
      let a = res[0].servicios;
      
      if(a === false){
        this.mostrar = true;
      }else{
        this.mostrar = false;
        this.publicaciones = res;

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
        // console.log(fot);


        this.inf.push({categoria:categoria,descuento:descuento,nombre:nombre,descripcion:descripcion,foto:fot,
                        id_servicio:id_servicios,id_provedores:id_provedores, duracion:duracion,precio:precio,
                        precio_cliente_prevenir:precio_cliente_prevenir, video:video, fotos:fotos });
      }
      // console.log(this.inf);
      }
     
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

    // let categoria = servicio.categoria;
    // let duracion = servicio.duracion;
    // let descuento = servicio.descuento;
    // let nombre = servicio.nombre;
    // let precio = servicio.precio;
    // let descripcion = servicio.descripcion;
    // let fot = servicio;
    // let id_servicios = servicio.id_servicios;
    // let id_provedores = servicio.id_provedores;
    // let precio_cliente_prevenir = servicio.precio_cliente_prevenir;
    // let video = servicio.video;
    // let fotos = servicio.foto;
    
    // fot = fot.foto[0];
    // fot = this.url+fot.ruta;
    
    // let info =[];
    // info.push({categoria:categoria,descuento:descuento,nombre:nombre,descripcion:descripcion,foto:fot,
    //                 id_servicio:id_servicios,id_provedores:id_provedores, duracion:duracion,precio:precio,
    //                 precio_cliente_prevenir:precio_cliente_prevenir, video:video, fotos:fotos });

    // let a = info;
    // a = a[0];
    this.navCtrl.push(ServicioPage,{servicio:servicio});
    this.inf=[];
  
    
  }

  presentConfirm(id) {
    
    let alert = this.alertCtrl.create({
      title: 'Confirmación',
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
              this.inf = [];
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
    this.inf=[];
    this.navCtrl.push(PublicarServicioPage);
  }
}
