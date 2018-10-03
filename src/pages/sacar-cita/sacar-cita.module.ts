import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SacarCitaPage } from './sacar-cita';

@NgModule({
  declarations: [
    SacarCitaPage,
  ],
  imports: [
    IonicPageModule.forChild(SacarCitaPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SacarCitaPageModule {}
