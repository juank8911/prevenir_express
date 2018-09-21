import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicarServicioPage } from './publicar-servicio';

@NgModule({
  declarations: [
    PublicarServicioPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicarServicioPage),
  ],
})
export class PublicarServicioPageModule {}
