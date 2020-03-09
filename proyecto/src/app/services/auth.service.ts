import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser:User;  
  options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
    })
  };
  
  constructor(private http: HttpClient, 
              private router: Router) { }

  public get currentUserValue(): User {
    return this.currentUser;
  }

  login(email:string ,password:string) {
    const url = 'https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/login';
    
    return new Promise((resolve,rejected) => {
      this.http.post(url, { user:email, pass:password }, this.options)
      .pipe(map(data => data))
      .subscribe(data=> {
        let user:User = data['user'];
        if (user) {
          this.currentUser = user;
          resolve(this.currentUser); 
        }
        else {
          rejected('error');
        }
      }, error => rejected(error));
    });
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/landing']);
  }

  register(nombre:string, correo:string, pass:string, fecha:string, dir:string, tipo:string) {
    const url = 'https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/registro-usuario';
    let datos = { nombre: nombre, correo: correo, pass: pass, fecha: fecha, dir: dir, tipo: tipo };

    return new Promise((resolve,rejected) => {
      this.http.post(url, datos, this.options)
      .pipe(map(data => data))
      .subscribe(data => {
        let estado:boolean = data['estado'];        
        if (estado) {
          let usuario = new User();
          usuario.AgregarDatos(datos);
          console.log(usuario);
          this.currentUser = usuario;
          resolve(this.currentUser);   
        } else {
          rejected('error');          
        }
      }, error => rejected(error));
    });
  }

}
