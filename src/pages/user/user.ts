import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Global} from '../../app/global';
import {ApiProvider} from '../../providers/api/api';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import * as moment from 'moment';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  base64Image:string;
  infoUser;
  foto;
  usuario = {};
  nombre;
  apellidos;
  identificacion;
  direccion;
  telefono;
  whats;
  fechaNacimiento:boolean;
  private datosAdmin : FormGroup;
  private datosUser : FormGroup;
  res;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera, 
    private global : Global, private api:ApiProvider, private formBuilder: FormBuilder,private toastCtrl:ToastController) {
      this.inicio();
   
  }

  inicio(){

    if (this.global.admin === false)
   {
    /////////////////////////////////Usuario///////////////////////////////////////////////////
    console.log("USERRRRRRRRRRR")
    this.infoUser = this.global.infoPerfil;
    this.foto = this.infoUser.avatar;
    
    if(!this.infoUser.fecha_nacimiento){
      console.log("AQUII");
      this.fechaNacimiento = false;
    }else{
      console.log("ACAAA");
      this.fechaNacimiento = true;
      var ff = moment(this.infoUser.fecha_nacimiento ).format('DD-M-YYYY');
      
    }
   
    
    this.datosUser = this.formBuilder.group({

      email: [this.infoUser.correo, [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      nombres: [this.infoUser.nombre, [Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
      apellidos: [this.infoUser.apellidos, [Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
      identificacion : [this.infoUser.cedula,[Validators.required]],
      direccion : [this.infoUser.direccion],
      telefono : [this.infoUser.telefono,[Validators.required,Validators.pattern('[0-9]*')]],
      whats : [this.infoUser.telefonowatshapp],
      fecha : [''],
      fecha2 : [ff],
   

    });

   }
   else{
    this.infoUser = this.global.infoPerfil;
    this.foto = this.global.apiUrl+this.infoUser.avatar;

    this.datosAdmin = this.formBuilder.group({

      email: [this.infoUser.correo, [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      nombres: [this.infoUser.nombre, [Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
      nit : [this.infoUser.nit,[Validators.required]],
      direccion : [this.infoUser.direccion],
      telefono : [this.infoUser.telefono],
      whats : [this.infoUser.telefonowatshapp],
      descripcion : [this.infoUser.descripcion],
      web : ['',[Validators.pattern('(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?')]],
      youtube : ['',[Validators.pattern('(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?')]],
      
   

    });
   }
  
  }
  ionViewDidLoad() {
    
  }



  openGalery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth:800,
      targetHeight:800,
      correctOrientation:true
        // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        // allowEdit: false,
        // correctOrientation: true,
        // //destinationType: this.camera.DestinationType.DATA_URL,
        // destinationType: this.camera.DestinationType.FILE_URI,
        // encodingType: this.camera.EncodingType.JPEG,
        // mediaType: this.camera.MediaType.PICTURE,
        // quality: 75,
        // saveToPhotoAlbum: false,
        // targetWidth: 800,
        // targetHeight: 800
    }
   
      this.camera.getPicture(options).then((imageData)=>{   
        this.base64Image = 'data:image/jpeg;base64,'+imageData;

      },(err)=>{
  
      });
    
  }
  event(ev){
    console.log(ev);
  }
  datosUsr(){
    
    console.log(this.fechaNacimiento);
    if(this.fechaNacimiento === false){

     console.log("Aqui");
      var fecha1 = moment(this.datosUser.value.fecha); //fecha de nacimiento
      var today = moment(new Date().toISOString()).format('YYYY-M-DD');
      var fecha2 = moment(today);  //fecha actual
      var years = fecha2.diff(fecha1, 'years');
      
      if(!this.datosUser.value.fecha){
        this.presentToast("Por favor selecciona una fecha de nacimiento");
        this.inicio();
      }
      else if(years < 18){
        this.presentToast("Para sacar una cita debes ser mayor de 18 años, vuelve más tarde");
        this.inicio()
      }else{
        
        let datos={cedula:this.datosUser.value.identificacion , nombre:this.datosUser.value.nombres, apellidos:this.datosUser.value.apellidos,
          direccion:this.datosUser.value.direccion, telefono:this.datosUser.value.telefono, telefonowatshapp: this.datosUser.value.whats,
          fecha_nacimiento:this.datosUser.value.fecha, id:this.global.id_usuario}
            console.log(datos);


          this.api.editUser(datos).then((data)=>{
            this.res = data;
            if(this.res.update === true){
              this.presentToast("Datos actualizados con exito");
              this.navCtrl.pop();
            }else{
              this.presentToast("Por favor llena los datos requeridos");
            }
          },(err)=>{
            this.presentToast("Error al actualizar, intentalo más tarde");
          });

  
      }
    }
    else{
     
      let datos={cedula:this.datosUser.value.identificacion , nombre:this.datosUser.value.nombres, apellidos:this.datosUser.value.apellidos,
      direccion:this.datosUser.value.direccion, telefono:this.datosUser.value.telefono, telefonowatshapp: this.datosUser.value.whats,
      fecha_nacimiento:this.infoUser.fecha_nacimiento, id:this.global.id_usuario}
        console.log(datos);
      this.api.editUser(datos).then((data)=>{
        this.res = data;
        if(this.res.update === true){
          this.presentToast("Datos actualizados con exito");
          this.navCtrl.pop();
        }else{
          this.presentToast("Por favor llena los datos requeridos");
        }
      },(err)=>{
        this.presentToast("Error al actualizar, intentalo más tarde");
      });

    }
   

    }

    datosProv(){

      let datos = {nit:this.datosAdmin.value.nit, correo:this.datosAdmin.value.email, nombre:this.datosAdmin.value.nombres,
      direccion:this.datosAdmin.value.direccion, telefono : this.datosAdmin.value.telefono, whatsapp: this.datosAdmin.value.whats,
      descripcion: this.datosAdmin.value.descripcion, link: this.datosAdmin.value.web, video: this.datosAdmin.value.video,id:this.global.id_usuario };
      this.api.editProv(datos).then((data)=>{
        this.res = data;
        if(this.res.update === true){
          this.presentToast("Datos actualizados con exito");
          this.navCtrl.pop();
        }else{
          this.presentToast("Por favor llena los datos requeridos");
        }
      },(err)=>{
        this.presentToast("Error al actualizar, intentalo más tarde");
      });

    }

    guardarAvatar(){
      // console.log(this.imagen);
      this.api.editAvatar(this.base64Image,this.global.id_usuario,this.global.admin).then((data)=>{
        let a = data[0].cambio;
        if(a === true){
          this.presentToast("Avatar cambiado con exito");
        }

      },(err)=>{
        console.log(err);
      });
    }

    presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 5000
      });
      toast.present();
    }
  
}
