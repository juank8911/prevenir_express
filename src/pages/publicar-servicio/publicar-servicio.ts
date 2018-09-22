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
  cambio:boolean = false;
  dis:boolean = true;
  f2 :boolean = false;
  f3 :boolean = false;
  dias;
  mdesde;
  mhasta;
  tdesde;
  thasta;
  dias2;
  mdesde2;
  mhasta2;
  tdesde2;
  thasta2;
  dias3;
  mdesde3;
  mhasta3;
  tdesde3;
  thasta3;
  ds = {};
  



  // formulario={"id_usuario":"","token":"","nombre":"","precio":"","descuento":"","descripcion":"","duracion":"",
  // "max_citas":"","video":"","id_mncp":"","id_ctga":"","imagenes":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
     public api:ApiProvider,private toastCtrl : ToastController,
    private camera: Camera,private global:Global,private alertCtrl: AlertController,private loadingCtrl: LoadingController) {
      let lunes = {nombre:"lunes"};
      let martes = {nombre:"martes"};
      let miercoles = {nombre:"miércoles"};
      let jueves = {nombre:"jueves"};
      let viernes = {nombre:"viernes"};
      let sabado = {nombre:"sábado"};
      let domingo = {nombre:"domingo"};

      this.ds = [lunes,martes,miercoles,jueves,viernes,sabado,domingo];
      console.log(this.ds);
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

    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: "Espera un momento<br>estamos procesando la información... ",
      duration: 3000
    });
    this.loading.present();
    
    let h1 = { m_de:this.mdesde, m_hasta:this.mhasta, t_de:this.tdesde , t_hasta:this.thasta , semana : this.dias};
      let h2 = { m_de:this.mdesde2, m_hasta:this.mhasta2, t_de:this.tdesde2 , t_hasta:this.thasta2 , semana : this.dias2};
      let h3 = { m_de:this.mdesde3, m_hasta:this.mhasta3, t_de:this.tdesde3 , t_hasta:this.thasta3 , semana : this.dias3};
      let horario = [h1,h2,h3]
      let h4 = {horario: horario}
      let horarios = [h4]
      let info5 = {horarios}
      
    
    let formulario = {"id_usuario":this.global.id_usuario,"token":this.token2,"nombre":this.datos.value.nombre,"precio":this.datos.value.precio,
    "descuento":this.datos.value.descuento, "duracion":this.datos.value.duracion,"id_mncp":this.mncpSelect,"id_ctga":this.cateSelect, "imagenes":this.imagenes,
    "video":this.datos.value.video,"max_citas":this.maxCitas,"descripcion":this.datos.value.descripcion, horarios};

    console.log(formulario);


    this.api.postImages(formulario).then((data)=>{
      this.res = data;
      this.res = this.res[0];
      console.log(this.res.agregado);
      if(this.res.agregado == true){
        this.loading.dismiss();
        this.presentToast("Servicio agregado con exito");
        this.navCtrl.pop();
      }
      else{
        this.loading.dismiss();
        this.presentToast("Error al agregar el servicio")
      }
    },(error)=>{console.log("error en la conexion");
    this.loading.dismiss();
    this.presentToast("Error en la conexion intentalo mas tarde")
    });
  
  
    }
   }
   else{
    let formularioEdit = {"id_usuario":this.global.id_usuario,"token":this.token2,"nombre":this.datos.value.nombre,"precio":this.datos.value.precio,
    "descuento":this.datos.value.descuento, "duracion":this.datos.value.duracion,"id_mncp":this.mncpSelect,"id_ctga":this.cateSelect, "imagenes":this.imagenes,
    "video":this.datos.value.video,"max_citas":this.maxCitas,"descripcion":this.datos.value.descripcion};
    this.api.editService(formularioEdit);
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

  agregarHorario(){

    if(this.cambio === false)  
    {
      this.f2= true;
      this.cambio=true;
    }
    else{
      this.f3=true;
      this.dis=false;
    }

  }

  diasF1(ev){
      
    this.dias=ev;
}
mdesdef1(ev){
  this.mdesde=ev;
}
mhastaf1(ev){
  this.mhasta=ev;
}
tdesdef1(ev){
  console.log(ev);
  this.tdesde=ev;
}
thastaf1(ev){
  console.log(ev);
 this.thasta=ev;

}  

diasF2(ev){
  this.dias2=ev;
}
mdesdef2(ev){
this.mdesde2=ev;
}
mhastaf2(ev){
this.mhasta2=ev;
}
tdesdef2(ev){
this.tdesde2=ev;
}
thastaf2(ev){
this.thasta2=ev;

}  
diasF3(ev){
this.dias3=ev;
}
mdesdef3(ev){
this.mdesde3=ev;
}
mhastaf3(ev){
this.mhasta3=ev;
}
tdesdef3(ev){
this.tdesde3=ev;
}
thastaf3(ev){
this.thasta3=ev;
}  

info(){
      console.log(this.dias + " " + this.dias2 + " " + this.dias3)
      console.log(this.mdesde + " " +  this.mhasta + " " + this.tdesde+ " " + this.thasta);
      console.log(this.mdesde2 + " " +  this.mhasta2 + " " + this.tdesde2+ " " + this.thasta2);
      console.log(this.mdesde3 + " " +  this.mhasta3 + " " + this.tdesde3+ " " + this.thasta3);

     let mdesde = parseInt(this.mdesde);
     let mhasta = parseInt(this.mhasta);
     let tdesde = parseInt(this.tdesde);
     let thasta = parseInt(this.thasta);
     let mdesde2 = parseInt(this.mdesde2);
     let mhasta2 = parseInt(this.mhasta2);
     let tdesde2 = parseInt(this.tdesde2);
     let thasta2 = parseInt(this.thasta2);
     let mdesde3 = parseInt(this.mdesde3);
     let mhasta3 = parseInt(this.mhasta3);
     let tdesde3 = parseInt(this.tdesde3);
     let thasta3 = parseInt(this.thasta3);


      if(!this.dias){
        console.log("Por favor selecciona dias f1")
      }
      else if(!this.dias2){console.log("Por favor selecciona dias f1")}
      else if(!this.dias3){console.log("Por favor selecciona dias f1")}

      if(mhasta < mdesde || thasta < tdesde){
        console.log("La hora de la inicio es mayor a la de finalizacion f1");
      }
      else if (mhasta2 < mdesde2 || thasta2 < tdesde2)
        {
          console.log("La hora de la inicio es mayor a la de finalizacion f2");
        }

        else if (mhasta3 < mdesde3 || thasta3 < tdesde3)
        {
          console.log("La hora de la inicio es mayor a la de finalizacion f3");
        }
        else{console.log("Todo bien");}

      let h1 = { m_de:this.mdesde, m_hasta:this.mhasta, t_de:this.tdesde , t_hasta:this.thasta , semana : this.dias};
      let h2 = { m_de:this.mdesde2, m_hasta:this.mhasta2, t_de:this.tdesde2 , t_hasta:this.thasta2 , semana : this.dias2};
      let h3 = { m_de:this.mdesde3, m_hasta:this.mhasta3, t_de:this.tdesde3 , t_hasta:this.thasta3 , semana : this.dias3};
      let horario = [h1,h2,h3]
      let h4 = {horario: horario}
      let horarios = [h4]
      let info5 = {horarios}
      console.log("NINFOOOOOOOOOOOO");
      console.log(info5);

}
}
