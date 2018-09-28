import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitasProvedorPage } from './citas-provedor';

@NgModule({
  declarations: [
    CitasProvedorPage,
  ],
  imports: [
    IonicPageModule.forChild(CitasProvedorPage),
  ],
})
export class CitasProvedorPageModule {}
