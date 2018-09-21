import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormularioRegistroPage} from '../formulario-registro/formulario-registro';
import {FormularioRegistroAdminPage} from '../formulario-registro-admin/formulario-registro-admin';
import {WelcomePage} from '../welcome/welcome';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  esAdmin:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  esUsuario(){
    this.esAdmin=false;
    this.navCtrl.push(FormularioRegistroPage,{esAdmin:this.esAdmin});
  }

  esProveedor(){
    this.esAdmin=true;
    this.navCtrl.push(FormularioRegistroAdminPage,{esAdmin:this.esAdmin});
  }

  goToWelcome(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  

}
