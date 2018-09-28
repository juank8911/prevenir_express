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
  public imagene;
  infoUser;
  foto;
  usuario = {};
  nombre;
  apellidos;
  identificacion;
  direccion;
  telefono;
  whats;
  private datosAdmin : FormGroup;
  private datosUser : FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera, 
    private global : Global, private api:ApiProvider, private formBuilder: FormBuilder,private toastCtrl:ToastController) {
      
   if (this.global.admin === false)
   {

    this.infoUser = this.global.infoPerfil;
    this.foto = this.global.apiUrl+this.infoUser.avatar;
    
    this.datosUser = this.formBuilder.group({

      email: [this.infoUser.correo, [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      nombres: [this.infoUser.nombre, [Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
      apellidos: [this.infoUser.apellidos, [Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
      identificacion : [this.infoUser.cedula,[Validators.required]],
      direccion : [this.infoUser.direccion],
      telefono : [this.infoUser.telefono,[Validators.pattern('[0-9]*')]],
      whats : [this.infoUser.telefonowatshapp],
      fecha : [],
   

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


 

  // validacionesUser(){
   
  //   this.datos = this.formBuilder.group({

  //     email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  //     nombres: [this.nombre, [Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
  //     apellidos: [this.apellidos, [Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
  //     identificacion : [this.identificacion,[Validators.required]],
  //     direccion : [this.direccion],
  //     telefono : [this.telefono],
  //     whats : [this.whats],
      
   

  //   });
    
  // }

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
        this.imagene.push({foto : 'data:image/jpeg;base64,'+imageData});
      },(err)=>{
  
      });
    
  }
  event(ev){
    console.log(ev);
  }
  datosUsr(){
    
    var fecha1 = moment(this.datosUser.value.fecha); //fecha de nacimiento
    var today = moment(new Date().toISOString()).format('YYYY-M-DD');
    var fecha2 = moment(today);  //fecha actual
    
    // console.log(fecha2.diff(fecha1, 'years'), ' años de diferencia');
    var years = fecha2.diff(fecha1, 'years');
  
    if(years < 18){
      this.presentToast("Pailas menor");
    }else{
      this.presentToast("Buena mayor");
    }

    }

    presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 5000
      });
      toast.present();
    }
  
}
