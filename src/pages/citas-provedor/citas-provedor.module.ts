import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitasProvedorPage } from './citas-provedor';

@NgModule({
  declarations: [
    CitasProvedorPage,
  ],
  imports: [
    IonicPageModule.forChild(CitasProvedorPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CitasProvedorPageModule {}
