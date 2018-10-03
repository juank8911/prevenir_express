import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Global} from '../../app/global';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// let apiUrl = 'http://192.168.2.104:3300';

@Injectable()
export class ApiProvider {

  // obtenerDatos(){
  // 	return this.http.get('https://jsonplaceholder.typicode.com/posts');
  // }
  public token;
  public token2;
  public apiUrl;

  constructor(public http: HttpClient,private global : Global) {
    this.apiUrl = global.apiUrl;
  }

  
  /////////////////////////////////////// POST ///////////////////////////////////////////////

  postLogin(datos,tipo:string) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
  
        this.http.post(this.apiUrl+tipo, datos, {headers : headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
  
    postRegistro(datos,tipo:string){
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
    
          this.http.post(this.apiUrl+tipo, datos, {headers : headers})
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
    }

    postImages(datos){
      console.log("Entreeeee");
      let cadena = "pepin";
      cadena = cadena.replace('"',' ');
      console.log(cadena);
      console.log(datos);
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
    
          this.http.post(this.apiUrl+'/services' ,datos, {headers : headers})
            .subscribe(res => {
              console.log("Toy aquiiiii");
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
    }

    guardarCita(datos){
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
    
          this.http.post(this.apiUrl+'/events',datos, {headers : headers})
            .subscribe(res => {
              
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
    }

     /////////////////////////////////////// GET ///////////////////////////////////////////////

    getDepartamento()
    {
      return this.http.get(this.apiUrl+'/departamentos/47');
    }
    getMunicipio(id){
      return this.http.get(this.apiUrl+'/municipios/'+id);
    }
    getCategorias(){
      return this.http.get(this.apiUrl+'/categoria');
    }
    getServicios(){
      return this.http.get(this.apiUrl+'/services');  
    }
    getProovedor(id){
      return this.http.get(this.apiUrl+'/provedores/'+id);
    }
    getPublicacionesProveedor(id){
      return this.http.get(this.apiUrl+'/services/'+id);
    }

    getFechas()
    {
      return this.http.get(this.apiUrl+'/events');
    }
    getUser(id){
      return this.http.get(this.apiUrl+'/user/'+id);
    }

    getHorario(fecha,id){
      // console.log(fecha);
      // console.log("AQUIIIIIIIIIIIIIIIIII");
      return this.http.get(this.apiUrl+'/citas/'+fecha+'/'+id);
    }
    getCitasUsuario(id){
      return this.http.get(this.apiUrl + '/events/'+id);
    }

    getServicio(id){
      return this.http.get(this.apiUrl + '/servicess/'+id);
    }

    getCitasMedico(fecha,id){
   
        return this.http.get(this.apiUrl+'/servcitas/'+fecha+'/'+id);
    }

    getValidacion(id){
      return this.http.get(this.apiUrl+'/datos/'+id);
    }

    getBusqueda(idm,idc){
      return this.http.get(this.apiUrl+'/services/'+idm+'/'+idc);
    }
     /////////////////////////////////////// DELETE ///////////////////////////////////////////////

     dltService(id){
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.token = localStorage.getItem('token');
        this.token = this.token.split('"');
        this.token2=this.token[1];
        let url =this.apiUrl+'/services/'+id+"?token="+this.token2;
        console.log(url);
          this.http.delete(url,{headers : headers})
            .subscribe(res => {
              
              console.log(res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
     }
     
     dltCita(id){
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.token = localStorage.getItem('token');
        this.token = this.token.split('"');
        this.token2=this.token[1];
          this.http.delete(this.apiUrl+'/events/'+id+"?token="+this.token2,{headers : headers})
            .subscribe(res => {
              
              console.log(res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
     }

     dltCitaProvedor(idServicio, idProvedor){

      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.token = localStorage.getItem('token');
        this.token = this.token.split('"');
        this.token2=this.token[1];
          this.http.delete(this.apiUrl+'/eventss/'+idServicio+'/'+idProvedor+"?token="+this.token2,{headers : headers})
            .subscribe(res => {
              
              console.log(res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });

     }

    /////////////////////////////////////// PUT ///////////////////////////////////////////////

    editAvatar(foto,id,admin){

      return new Promise((resolve, reject) => {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.token = localStorage.getItem('token');
        this.token = this.token.split('"');
        this.token2=this.token[1];
        
        let j = {foto:foto,id:id,admin:admin};
        console.log(j);
          this.http.put(this.apiUrl+'/fotou/'+"?token="+this.token2,j,{headers : headers})
            .subscribe(res => {
              console.log("ENTRE AL PROVIDER");
              console.log(res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
    }


    editService(datos){
      return new Promise((resolve, reject) => {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.token = localStorage.getItem('token');
        this.token = this.token.split('"');
        this.token2=this.token[1];

        console.log(datos);

      //     this.http.put(this.apiUrl,{headers : headers})
      //       .subscribe(res => {
      //         console.log("ENTRE AL PROVIDER");
      //         console.log(res);
      //         resolve(res);
      //       }, (err) => {
      //         reject(err);
      //       });
      });
    }

    editUser(datos){
      return new Promise((resolve, reject) => {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.token = localStorage.getItem('token');
        this.token = this.token.split('"');
        this.token2=this.token[1];
        // console.log(this.token2);

          this.http.put(this.apiUrl+'/user/'+"?token="+this.token2,datos,{headers : headers})
            .subscribe(res => {
              console.log("ENTRE AL PROVIDER");
              console.log(res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
    }

    editProv(datos){
      return new Promise((resolve, reject) => {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.token = localStorage.getItem('token');
        this.token = this.token.split('"');
        this.token2=this.token[1];
        // console.log(this.token2);

          this.http.put(this.apiUrl+'/provedores/'+"?token="+this.token2,datos,{headers : headers})
            .subscribe(res => {
              console.log("ENTRE AL PROVIDER");
              console.log(res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
    }

    enviarMensaje(mensaje){

      return new Promise((resolve, reject) => {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

          this.http.put(this.apiUrl+'/sendm',mensaje, {headers : headers})
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
    }

}
