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
import {WelcomePage} from '../pages/welcome/welcome';
import {RegistroPage} from '../pages/registro/registro';
import {FormularioRegistroPage} from '../pages/formulario-registro/formulario-registro';
import {BeneficiariosPage} from '../pages/beneficiarios/beneficiarios';
import {FormularioRegistroAdminPage} from '../pages/formulario-registro-admin/formulario-registro-admin';
import {UserPage} from '../pages/user/user';
import { IonicStorageModule } from '@ionic/storage';
import {Global} from './global';
import {PublicarServicioPage} from '../pages/publicar-servicio/publicar-servicio';
import { ImagePicker } from '@ionic-native/image-picker';
import {ListadoPublicacionesPage} from '../pages/listado-publicaciones/listado-publicaciones';
import {AgregarBeneficiarioPage} from '../pages/agregar-beneficiario/agregar-beneficiario';
import {ActualizarServicioPage} from '../pages/actualizar-servicio/actualizar-servicio';
import {ModalCitaPage} from '../pages/modal-cita/modal-cita';
import {PopoverFiltroPage} from '../pages/popover-filtro/popover-filtro';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { Facebook } from '@ionic-native/facebook';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { YoutubePipe } from '../pipes/youtube/youtube';
import { FilterPipe } from '../pipes/filter/filter';


@NgModule({
  declarations: [
    MyApp,
    YoutubePipe,
    FilterPipe,
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
    BeneficiariosPage,
    FormularioRegistroAdminPage,
    AgregarBeneficiarioPage,
    CitasPage,
    ActualizarServicioPage,
    ModalCitaPage,
    PopoverFiltroPage
  

  ],
  imports: [
    BrowserModule,
    CalendarModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule

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
    BeneficiariosPage,
    FormularioRegistroAdminPage,
    AgregarBeneficiarioPage,
    CitasPage,
    ActualizarServicioPage,
    ModalCitaPage,
    PopoverFiltroPage
    
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
