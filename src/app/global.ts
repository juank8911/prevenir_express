import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public login:boolean = false;
  public id_usuario:string;
  public admin:boolean=false;
  public apiUrl ='http://192.168.2.101:3300';
  // public apiUrl = 'http://cdn.prevenirexpress.com';
}