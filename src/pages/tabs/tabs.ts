import { Component } from '@angular/core';

import { ServiciosPage } from '../servicios/servicios';
import { CitasPage } from '../citas/citas';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CitasPage;
  tab3Root = ServiciosPage;

  constructor() {

  }
}
