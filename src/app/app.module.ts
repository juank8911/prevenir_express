import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {CitasPage} from '../pages/citas/citas'
import { CalendarModule } from 'ionic3-calendar-en';



import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ServiciosPage } from '../pages/servicios/servicios';
import { ContactenosPage } from '../pages/contactenos/contactenos';
import { TerminosPage } from '../pages/terminos/terminos';
import { ServicioPage } from '../pages/servicio/servicio';
import { SacarCitaPage } from '../pages/sacar-cita/sacar-cita';
import { PublicacionesProveedorPage } from '../pages/publicaciones-proveedor/publicaciones-proveedor';
import {BlancoPage} from '../pages/blanco/blanco';
// import { IonicPageModule } from 'ionic-angular';
import {WelcomePage} from '../pages/welcome/welcome';
import {RegistroPage} from '../pages/registro/registro';
import {FormularioRegistroPage} from '../pages/formulario-registro/formulario-registro';
import {FormularioRegistroAdminPage} from '../pages/formulario-registro-admin/formulario-registro-admin';
import {UserPage} from '../pages/user/user';
import { IonicStorageModule } from '@ionic/storage';
import {Global} from './global';
import {PublicarServicioPage} from '../pages/publicar-servicio/publicar-servicio';
import { ImagePicker } from '@ionic-native/image-picker';
import {ListadoPublicacionesPage} from '../pages/listado-publicaciones/listado-publicaciones';
import {ModalCitaPage} from '../pages/modal-cita/modal-cita';
import {PopoverFiltroPage} from '../pages/popover-filtro/popover-filtro';
import {CitasProvedorPage} from '../pages/citas-provedor/citas-provedor';
import {ModalCitaUserPage} from '../pages/modal-cita-user/modal-cita-user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { Facebook } from '@ionic-native/facebook';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { YoutubePipe } from '../pipes/youtube/youtube';
import { FilterPipe } from '../pipes/filter/filter';
import {BlancoPageModule} from '../pages/blanco/blanco.module';
import {CitasPageModule} from '../pages/citas/citas.module';
import {CitasProvedorPageModule} from '../pages/citas-provedor/citas-provedor.module';
import {ContactenosPageModule} from '../pages/contactenos/contactenos.module';
import {FormularioRegistroPageModule} from '../pages/formulario-registro/formulario-registro.module';
import {FormularioRegistroAdminPageModule} from '../pages/formulario-registro-admin/formulario-registro-admin.module';
import {ListadoPublicacionesPageModule} from '../pages/listado-publicaciones/listado-publicaciones.module';
import {ModalCitaPageModule} from '../pages/modal-cita/modal-cita.module';
import {ModalCitaUserPageModule} from '../pages/modal-cita-user/modal-cita-user.module';
import {PopoverFiltroPageModule} from '../pages/popover-filtro/popover-filtro.module';
import {PublicacionesProveedorPageModule} from '../pages/publicaciones-proveedor/publicaciones-proveedor.module';
import {PublicarServicioPageModule} from '../pages/publicar-servicio/publicar-servicio.module';
import {RegistroPageModule} from '../pages/registro/registro.module';
import {SacarCitaPageModule} from '../pages/sacar-cita/sacar-cita.module';
import {UserPageModule} from '../pages/user/user.module';
import {WelcomePageModule} from '../pages/welcome/welcome.module';
import {ServicioPageModule} from '../pages/servicio/servicio.module';
import {TerminosPageModule} from '../pages/terminos/terminos.module';





@NgModule({
  declarations: [
    MyApp,
    // FilterPipe,
    HomePage,
    TabsPage,
    // YoutubePipe,
    // ContactenosPage,
    // ServiciosPage,
    // TerminosPage,
    // ServicioPage,
    // SacarCitaPage,
    // PublicacionesProveedorPage,
    // BlancoPage,
    // WelcomePage,
    // RegistroPage,
    // FormularioRegistroPage,
    // PublicarServicioPage,
    // UserPage,
    // ListadoPublicacionesPage,
    // FormularioRegistroAdminPage,
    // CitasPage,
    // ModalCitaPage,
    // PopoverFiltroPage,
    // CitasProvedorPage,
    // ModalCitaUserPage
  

  ],
  imports: [
    BrowserModule,
    CalendarModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    BlancoPageModule,
    CitasProvedorPageModule,
    CitasPageModule,
    ContactenosPageModule,
    FormularioRegistroPageModule,
    FormularioRegistroAdminPageModule,
    ListadoPublicacionesPageModule,
    ModalCitaPageModule,
    ModalCitaUserPageModule,
    PopoverFiltroPageModule,
    PublicacionesProveedorPageModule,
    PublicarServicioPageModule,
    RegistroPageModule,
    SacarCitaPageModule,
    UserPageModule,
    WelcomePageModule,
    ServicioPageModule,
    TerminosPageModule,
    
  

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ContactenosPage,
    ServiciosPage,
    TerminosPage,
    ServicioPage,
    SacarCitaPage,
    PublicacionesProveedorPage,
    BlancoPage,
    WelcomePage,
    RegistroPage,
    FormularioRegistroPage,
    PublicarServicioPage,
    UserPage,
    ListadoPublicacionesPage,
    FormularioRegistroAdminPage,
    CitasPage,
    ModalCitaPage,
    PopoverFiltroPage,
    CitasProvedorPage,
    ModalCitaUserPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Global,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    Facebook,
  ]
})
export class AppModule {}
