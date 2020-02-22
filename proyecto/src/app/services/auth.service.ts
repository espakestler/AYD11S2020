import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, observable, Observable } from 'rxjs';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser:User;
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  api_ruta = 'https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec';

  constructor(private http: HttpClient, 
              private router: Router) { 
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUser;
  }

  login(email:string ,password:string) {
    let datos = { user:email, pass:password };
    let url = this.api_ruta+'/login';
    let options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':'application/json',
      })
    };
    
    return new Promise((resolve,rejected) => {
      this.http.post(url,JSON.stringify(datos),options).subscribe((respuesta)=> {
        if( respuesta.hasOwnProperty('existe') && respuesta['existe'] == 'true') {
          this.currentUser = {
            nombre: email,
            email: email,
            pass: password,
            fecha: '',
            direccion: '',
            tipo: '1'
          };
          resolve(this.currentUser); 
        }
        else {
          rejected('error');
        }
      });
    });
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/auth']);
  }

  register(nombre:string, email:string, password:string, fecha:string, direccion:string, tipo:string) { 
    let datos = { 
      nombre: nombre,
      correo: email, 
      pass: password,
      fecha: fecha,
      dir: direccion,
      tipo: tipo
    };
    let url = this.api_ruta+'/registro-usuario';
    let options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':'application/json',
      })
    };
    
    return new Promise((resolve,rejected) => {
      this.http.post(url,JSON.stringify(datos),options).subscribe((respuesta)=> {
        if( respuesta.hasOwnProperty('message') && respuesta['message'] == 'true') {
          this.currentUser = {
            nombre: nombre,
            email: email,
            pass: password,
            fecha: fecha,
            direccion: direccion,
            tipo: tipo
          };
          resolve(this.currentUser); 
        }
        else {
          rejected('error');
        }
      });
    });
  }

}
