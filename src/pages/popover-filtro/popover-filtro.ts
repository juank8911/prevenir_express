import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';

/**
 * Generated class for the PopoverFiltroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-filtro',
  templateUrl: 'popover-filtro.html',
})
export class PopoverFiltroPage {
  ctgas;
  mncps;
  dptms;
  mncpSelect;
  dptmSelect;
  cateSelect;
  event;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private api:ApiProvider,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
    this.categorias();
    this.departamentos();
  }

  departamentoSelect(selectedValue: any){
    this.dptmSelect = selectedValue;
    console.log(selectedValue);
    this.api.getMunicipio(selectedValue).subscribe((data)=>{
      this.mncps = data;
      // console.log(data);
    },(error)=>{console.log(error);
    });
  }

  categorias(){
    this.api.getCategorias().subscribe((data)=>{
     this.ctgas = data;
    //  console.log(this.ctgas);
    },(err)=>{console.log(err)});
  }



  departamentos(){
    this.api.getDepartamento().subscribe((data)=>{
        this.dptms = data;
    },(err)=>{console.log(err)});
  }
  categoriaSelect(selectedValue: any){
    this.cateSelect = selectedValue;
    // console.log(this.cateSelect);
  }

  municipioSelect(selectedValue: any){
    this.mncpSelect = selectedValue;
    // console.log(this.mncpSelect);
  }

  buscar(){
    this.event={categoria:this.cateSelect, departamento:this.dptmSelect, municipio:this.mncpSelect};
    this.viewCtrl.dismiss(this.event);
  }
}
