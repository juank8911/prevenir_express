import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public login:boolean = false;
  public id_usuario;
  public admin:boolean=false;
<<<<<<< HEAD
  //public apiUrl ='http://192.168.2.105:3300';
  public apiUrl = 'http://cdn.prevenirexpress.com';
=======
  // public apiUrl ='http://192.168.2.105:3300';
  public apiUrl = 'http://cdn.prevenirexpress.com';
  public infoPerfil={};
  public foto;
  public nombre;
>>>>>>> 28794bc2bfd8187598ef7dde57ee46c1d21d1b35
}
