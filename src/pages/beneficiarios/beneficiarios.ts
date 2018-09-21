import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AgregarBeneficiarioPage} from '../agregar-beneficiario/agregar-beneficiario';
/**
 * Generated class for the BeneficiariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beneficiarios',
  templateUrl: 'beneficiarios.html',
})
export class BeneficiariosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeneficiariosPage');
  }

  goToAgregar(){
    this.navCtrl.push(AgregarBeneficiarioPage);
  }

}
