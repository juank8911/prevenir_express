import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,Loading,
  LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import CryptoJS from 'crypto-js';
import {HomePage} from '../home/home';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';

/**
 * Generated class for the FormularioRegistroAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formulario-registro-admin',
  templateUrl: 'formulario-registro-admin.html',
})
export class FormularioRegistroAdminPage {
  loading: Loading;
  user:any;
  face:any;
  hashed:any;
  esAdmin:any;
  resposeData : any;
  tokenR:string;
  id_usuario:string;
  key : string = "token";
  keyId : string = "id";
  keyAdmin : string = "admin";
  userData = {"id":"","email":"","pssw":"","nombre":"" ,"esAdmin":"","face":"","direccion":"","nit":"","tel":"","wsp":""};
  private datos : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:Facebook,
    private toastCtrl:ToastController,public auth:ApiProvider,private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {

      this.datos = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
        email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        pssw: ['',[Validators.required,Validators.minLength(8)]],
        direccion: ['',[Validators.required]],
        id: ['',[Validators.required,Validators.min(0)]],
        tel: ['',[Validators.required,Validators.min(0)]],
        wsp: ['',[]],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormularioRegistroAdminPage');
  }

  registrar(){
   if(!this.datos.valid)
   {this.presentToast("Completa los campos requeridos");
  }
   else{

    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: "Espera un momento<br>estamos guardando tu información... ",
      duration: 3000
    });
    this.loading.present();

      this.esAdmin=true;
      this.face=false;

      this.userData = {"id":this.datos.value.id,"email":this.datos.value.email,"pssw":this.datos.value.pssw,
      "nombre":this.datos.value.nombre,"esAdmin":this.esAdmin,"face":this.face,"direccion":this.datos.value.direccion,
      "nit":this.datos.value.id,"tel":this.datos.value.tel,"wsp":this.datos.value.wsp};

      console.log(this.userData);
      this.auth.postLogin(this.userData,"/register").then((result)=>{
        
         this.resposeData = result;
        var r1 = result[0];
        var r2 = result[1];
        // console.log(this.resposeData);
        console.log("registro11122131");
        console.log(this.resposeData);
        console.log(r1);
        console.log(r2);
        
        ///////////////////////////verificar si el usuario no existe/////////////////
        if(r1.existe==false){  
        
          localStorage.setItem(this.key,JSON.stringify(r2.token));
          localStorage.setItem(this.keyId,JSON.stringify(r1.id_usuario));
          localStorage.setItem(this.keyAdmin,JSON.stringify(r2.esAdmin));
          this.loading.dismiss();
          this.navCtrl.push(HomePage);
        }
        else{
          this.loading.dismiss();
          this.presentToast("El usuario ya se encuentra registrado");
        }
    
      },(error)=>{
        this.loading.dismiss();
        this.presentToast("error en la conexion intentalo mas tarde")}
    );
    
  }
}

  goBack(){
    this.navCtrl.pop();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
