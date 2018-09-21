import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController,Loading,
  LoadingController  } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Global} from '../../app/global';
import {ListadoPublicacionesPage} from '../listado-publicaciones/listado-publicaciones';


/**
 * Generated class for the PublicarServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicar-servicio',
  templateUrl: 'publicar-servicio.html',
})
export class PublicarServicioPage {
  dptms;
  base64Image:string;
  private datos : FormGroup;
  public imagenes;
  public mncps;
  public mncpSelect;
  public cateSelect;
  public ctgas;
  public id_global;
  public token;
  public maxCitas;
  public token2;
  public res;
  public editar;
  public rutasImg;
  public imgsEdit;
  public ruta;
  loading: Loading;

  formulario={"id_usuario":"","token":"","nombre":"","precio":"","descuento":"","descripcion":"","duracion":"",
  "max_citas":"","video":"","id_mncp":"","id_ctga":"","imagenes":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
     public api:ApiProvider,private toastCtrl : ToastController,
    private camera: Camera,private global:Global,private alertCtrl: AlertController,private loadingCtrl: LoadingController) {

      this.editar = this.navParams.get('pub');
      console.log(this.editar);
      if(this.editar){
        this.rutasImg = this.editar.foto;
        // this.rutasImg = this.rutasImg[0];
        // console.log(this.rutasImg.ruta);
        this.validacionEditar();
      }
      else{
        this.validacionAgregar();
      }
      
      
      
      // this.ruta = global.apiUrl+this.rutasImg.ruta;
      // this.imgsEdit=[];

      // this.imgsEdit.push({ruta:global.apiUrl+this.rutasImg});
      this.imagenes = [];   

   

      this.token = localStorage.getItem('token');
      this.token = this.token.split('"');
      this.token2=this.token[1];
      
      
      
      
      
  }
  validacionEditar ()
  {
    this.datos = this.formBuilder.group({
      nombre: [this.editar.nombre, [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      duracion :[this.editar.duracion,[Validators.required,Validators.max(60),Validators.min(15)]],
      precio: [this.editar.precio,[Validators.required,Validators.min(0)]],
      descuento: [this.editar.descuento,[Validators.max(100),Validators.min(0)]],
      video :[this.editar.video],                               
      descripcion: [this.editar.descripcion,[Validators.required,Validators.minLength(40)]],    
      check:[false,[Validators.requiredTrue]],
   

    });
  }

  validacionAgregar(){
    this.datos = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      duracion :['',[Validators.required,Validators.max(60),Validators.min(15)]],
      precio: ['',[Validators.required,Validators.min(0)]],
      descuento: ['',[Validators.max(100),Validators.min(0)]],
      video :[''],                               
      descripcion: ['',[Validators.required,Validators.minLength(40)]],    
      check:[false,[Validators.requiredTrue]],
   

    });
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
    if (this.imagenes.length < 6) {
      
      this.camera.getPicture(options).then((imageData)=>{
        
        
        this.imagenes.push({base64Image : 'data:image/jpeg;base64,'+imageData});

    
      },(err)=>{
  
      });
    }
  }

  departamentos(){
    this.api.getDepartamento()
  	.subscribe(
    (data)=>{this.dptms=data;
    // console.log(this.dptms)
  },
  	(error)=>{console.log(error);})
  }
  departamentoSelect(selectedValue: any){
    console.log(selectedValue);
    this.api.getMunicipio(selectedValue).subscribe((data)=>{
      this.mncps = data;
      // console.log(data);
    },(error)=>{console.log(error);
    });
  }

  categorias(){
    this.api.getCategorias()
  	.subscribe(
    (data)=>{this.ctgas=data;
    console.log(this.ctgas)},
  	(error)=>{console.log(error);})
  }
  categoriaSelect(selectedValue: any){
    this.cateSelect = selectedValue;
    // console.log(this.cateSelect);
  }
  municipioSelect(selectedValue: any){
    this.mncpSelect = selectedValue;
    // console.log(this.mncpSelect);
  }

  maxCitasSelect(selectedValue: any){
    this.maxCitas = selectedValue;
    // console.log(this.maxCitas);
  }
  ionViewDidLoad() {
    
    this.departamentos();
    this.categorias();
  
  }

  registrar(){
   
    if(!this.editar){
    if(this.imagenes.length < 1)
    {
      this.presentToast("Debes elegir almenos una imagen")
    }
    else if(!this.mncpSelect)
    {
      this.presentToast("Debes elegir un municipio")
    }
    else 
      if(!this.datos.valid) {
      this.presentToast("completa los campos requeridos");
    }
    else{
    this.formulario = {"id_usuario":this.global.id_usuario,"token":this.token2,"nombre":this.datos.value.nombre,"precio":this.datos.value.precio,
    "descuento":this.datos.value.descuento, "duracion":this.datos.value.duracion,"id_mncp":this.mncpSelect,"id_ctga":this.cateSelect, "imagenes":this.imagenes,
    "video":this.datos.value.video,"max_citas":this.maxCitas,"descripcion":this.datos.value.descripcion};

    console.log(this.formulario);


    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: "Espera un momento<br>estamos guardando el servicio... ",
      duration: 3000
    });
    this.loading.present();
    
    this.api.postImages(this.formulario).then((data)=>{
      this.res = data;
      this.res = this.res[0];
      console.log(this.res.agregado);
      if(this.res.agregado == true){
        this.loading.dismiss();
        this.presentToast("Servicio agregado con exito");
        this.navCtrl.pop();
      }
      else{
        this.presentToast("Error al agregar el servicio")
      }
    },(error)=>{console.log("error en la conexion");
    this.presentToast("Error en la conexion intentalo mas tarde")
    });
  
  
    }
   }
   else{
    this.formulario = {"id_usuario":this.global.id_usuario,"token":this.token2,"nombre":this.datos.value.nombre,"precio":this.datos.value.precio,
    "descuento":this.datos.value.descuento, "duracion":this.datos.value.duracion,"id_mncp":this.mncpSelect,"id_ctga":this.cateSelect, "imagenes":this.imagenes,
    "video":this.datos.value.video,"max_citas":this.maxCitas,"descripcion":this.datos.value.descripcion};
    this.api.editService(this.formulario);
   }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  borrarFoto(index){
    this.imagenes.splice(index, 1);
  }

}
