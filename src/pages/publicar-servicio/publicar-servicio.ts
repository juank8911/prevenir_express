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
  public cont:boolean=false;
  


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
  ds = [];
  f1d:boolean=false;
  f2d:boolean=false;
  h1:boolean=false;
  h2:boolean=false;
  h3:boolean=false;
  



  // formulario={"id_usuario":"","token":"","nombre":"","precio":"","descuento":"","descripcion":"","duracion":"",
  // "max_citas":"","video":"","id_mncp":"","id_ctga":"","imagenes":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
     public api:ApiProvider,private toastCtrl : ToastController,
    private camera: Camera,private global:Global,private alertCtrl: AlertController,private loadingCtrl: LoadingController) {
   



      
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


  ionViewDidLoad() {

    this.departamentos();
    this.categorias();
    this.days();
  }

  days(){

    let lunes = {nombre:"lunes", disponible:true};
    let martes = {nombre:"martes",disponible:true};
    let miercoles = {nombre:"miércoles",disponible:true};
    let jueves = {nombre:"jueves",disponible:true};
    let viernes = {nombre:"viernes",disponible:true};
    let sabado = {nombre:"sábado",disponible:true};
    let domingo = {nombre:"domingo",disponible:true};

    let days = [lunes,martes,miercoles,jueves,viernes,sabado,domingo]

    for(var i = 0; i < days.length; i++){
      let dia = days[i];
      this.ds.push({dia});
    }
    // console.log(this.ds);
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
      nombre: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
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
    // console.log(this.ctgas)
  },
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

  validacionh1(){
        let mdesde = parseInt(this.mdesde);
        let mhasta = parseInt(this.mhasta);
        let tdesde = parseInt(this.tdesde);
        let thasta = parseInt(this.thasta);
        
           if(!this.dias){
              this.presentToast("Por favor selecciona dias en el horario 1");
            }else if((!mhasta || !mdesde) &&  (!thasta || !tdesde) ){
              this.presentToast("Seleciona horas de atención en el horario 1");
            }
            else  if(mhasta < mdesde || thasta < tdesde){
              this.presentToast("La hora de la inicio es mayor a la de finalización en el horario 1");
            }else{
                this.h1=true;
            }
  }

  validacionh2(){
      let mdesde2 = parseInt(this.mdesde2);
      let mhasta2 = parseInt(this.mhasta2);
      let tdesde2 = parseInt(this.tdesde2);
      let thasta2 = parseInt(this.thasta2);

            if(!this.dias2){
             this.presentToast("Por favor selecciona dias en el horario 2");
            }
            else if((!mhasta2 || !mdesde2) &&  (!thasta2 || !tdesde2) ){
              this.presentToast("Seleciona horas de atención en el horario 2");
            }
            else if (mhasta2 < mdesde2 || thasta2 < tdesde2)
            {
              this.presentToast("La hora de la inicio es mayor a la de finalización en el horario 2");
            }else{
              this.h2=true;
            }
  }

  validacionh3(){
      let mdesde3 = parseInt(this.mdesde3);
      let mhasta3 = parseInt(this.mhasta3);
      let tdesde3 = parseInt(this.tdesde3);
      let thasta3 = parseInt(this.thasta3);

      if(this.f3 === true && !this.dias3){
        this.presentToast("Por favor selecciona dias en el horario 3");
      }else if((!mhasta3 || !mdesde3) &&  (!thasta3 || !tdesde3) ){
        this.presentToast("Seleciona horas de atención en el horario 3");
      }
      else if (mhasta3 < mdesde3 || thasta3 < tdesde3)
      {
        this.presentToast("La hora de la inicio es mayor a la de finalización en el horario 3");
      }else{
        this.h3=true;
      }
  }

  agregarHorario(){

    if(this.cont === false){
      this.validacionh1();
      if(this.h1 === true){

        for(var i = 0; i<this.dias.length; i++){
        
          for(var j = 0;j<this.ds.length ;j++){
            let d = [];
            d = this.ds[j].dia.nombre;
            let  da = this.ds[j].dia.disponible;
            
            if(this.dias[i] === d){
              if (this.ds[j].dia.nombre === d)
              {
                // console.log("POR AQUII")
                var h = this.ds[j].dia.disponible = false;
                // console.log(h);
              }      
            }
          }
        }
        this.cont = true;
        this.f1d = true;
        
      }
     
    }
        
      if(this.cont === true){

          
        if(this.cambio === false)  
        {
          this.cambio=true; 
          this.f2= true;
        }
           
       else
       { 

        this.validacionh2();
        if(this.h2 === true){

          for(var m = 0; m<this.dias2.length; m++){
          
            for(var n = 0;n<this.ds.length ;n++){
              let d = [];
              d = this.ds[n].dia.nombre;
              let  da = this.ds[n].dia.disponible;
              
              if(this.dias2[m] === d){
                console.log(d);
                if (this.ds[n].dia.nombre === d)
                {
                  console.log(d);
                  // console.log("POR AQUII")
                  var k = this.ds[n].dia.disponible = false;
                  // console.log(h);
                }      
              }
            }
            this.f2d=true;
            this.f3=true;
            this.dis=false;
          } 
        }
      } 
    }
  } 
  

  registrar(){
   
    if(!this.editar){

   /////////////////////////// Validaciones horarios ////////////////////////////////
      
    let hor:boolean = true;
    var tbn:boolean = true;

      switch(hor === true){

        case this.h1 === false:
        this.validacionh1();
        // console.log("1");
        break;

        case (this.h1 === true && this.f2 === false && this.f3 === false):
        // console.log("registrar");
        this.enviar();
        break;

        case (this.h1 === true && this.h2 === true && this.f3 === false):
        // console.log("AQUIIIIIIII REGISTRARRRR");
        this.enviar();
        break;

        case (this.h1 === true && this.h2 === true && this.h3 === true):
        // console.log("registrar");
        this.enviar();
        break;

        case ( this.f3 === true):
        this.validacionh3();
        break;

        case (this.h1 === true && this.f2 === true ):
        this.validacionh2();
        break;

       

      }
    
   }
   else{
    let formularioEdit = {"id_usuario":this.global.id_usuario,"token":this.token2,"nombre":this.datos.value.nombre,"precio":this.datos.value.precio,
    "descuento":this.datos.value.descuento, "duracion":this.datos.value.duracion,"id_mncp":this.mncpSelect,"id_ctga":this.cateSelect, "imagenes":this.imagenes,
    "video":this.datos.value.video,"max_citas":this.maxCitas,"descripcion":this.datos.value.descripcion};
    this.api.editService(formularioEdit);
   }
  }

  enviar(){

    if(this.imagenes.length < 1){
       this.presentToast("Debes elegir almenos una imagen");
    }
    else if(!this.mncpSelect)
    {
      this.presentToast("Debes elegir un municipio");
    }else if(!this.cateSelect){
      this.presentToast("Debes elegir una categoria");
    }else if(!this.maxCitas){
      this.presentToast("Por favor selecciona un número maximo de citas por hora");
    }
     else if(!this.datos.valid) {
      this.presentToast("completa los campos requeridos");
    }
    else{

   
    
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

    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: "Espera un momento<br>estamos procesando la información... ",
      duration: 3000
    });
    this.loading.present();

    this.api.postImages(formulario).then((data)=>{
      // console.log("AQUIIIIII");
      console.log(data);
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration:5000
    });
    toast.present();
  }

  borrarFoto(index){
    this.imagenes.splice(index, 1);
  }

diasF1(ev){
      
    this.dias=ev;
    console.log(this.dias);
}
mdesdef1(ev){
  this.mdesde=ev;
}
mhastaf1(ev){
  this.mhasta=ev;
  this.validacionh1();
}
tdesdef1(ev){
  console.log(ev);
  this.tdesde=ev;
}
thastaf1(ev){
  console.log(ev);
 this.thasta=ev;
 this.validacionh1();

}  

diasF2(ev){
  this.dias2=ev;
  console.log(this.dias2);
}
mdesdef2(ev){
this.mdesde2=ev;
}
mhastaf2(ev){
this.mhasta2=ev;
this.validacionh2();
}
tdesdef2(ev){
this.tdesde2=ev;
}
thastaf2(ev){
this.thasta2=ev;
this.validacionh2();

}  
diasF3(ev){
this.dias3=ev;
}
mdesdef3(ev){
this.mdesde3=ev;
}
mhastaf3(ev){
this.mhasta3=ev;
this.validacionh3();
}
tdesdef3(ev){
this.tdesde3=ev;
}
thastaf3(ev){
this.thasta3=ev;
this.validacionh3();
}  

}


