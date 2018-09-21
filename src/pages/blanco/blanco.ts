import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,
  LoadingController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {WelcomePage} from '../welcome/welcome';

/**
 * Generated class for the BlancoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blanco',
  templateUrl: 'blanco.html',
})
export class BlancoPage {
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {

    this.estaLogeado();
  }
  estaLogeado(){
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: "Espera un momento... ",
      duration: 3000
    });
    this.loading.present();
    let mostrar = localStorage.getItem("token");
    // console.log("Aqui toyyy"+mostrar);
    if(mostrar != null){
      this.loading.dismiss();
     this.navCtrl.setRoot(HomePage);
    }
    else{
      this.loading.dismiss();
      this.navCtrl.setRoot(WelcomePage)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlancoPage');
  }

}
