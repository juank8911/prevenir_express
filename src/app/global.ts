import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public login:boolean = false;
  public id_usuario:string;
  public admin:boolean=false;
  public apiUrl = 'http://cdn.prevenirexpress.com';
}