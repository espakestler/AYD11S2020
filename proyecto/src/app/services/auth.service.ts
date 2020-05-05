import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";

import { User } from '../models/user';
import { StorageService } from '../storage.service'


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
              private router: Router, public storageService: StorageService) { }

  public get currentUserValue(): User {
    return this.currentUser;
  }

  login(email:string ,password:string) {
    const url = 'https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/login';
    
    return new Promise((resolve,rejected) => {
      this.http.post(url, { user:email, pass:password }, this.options)
      .pipe(map(data => data))
      .subscribe(data=> {
        let estado:boolean = data['success'];
        if (estado) {
          let user:User = data['user'];
          this.currentUser = user;
          this.storageService.setObject('usuario', user).then(result => {
            resolve(data);
          });
        }
        else {
          resolve(data);
        }
      }, error => rejected('Error de conexion'));
    });
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/landing']);
  }

  register(item:any) {
    const url = 'https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/registro-usuario';

    return new Promise((resolve,rejected) => {
      this.http.post(url, JSON.stringify(item), this.options)
      .pipe(map(data => data))
      .subscribe(data => {
        let estado:boolean = data['success'];
        if (estado) {
          let usuario = new User();
          usuario.AgregarDatos(item);
          this.storageService.setObject('usuario', item).then(result => {
            resolve(data);
          });
        }
        else
          resolve(data);
      }, error => rejected('Error de conexión'));
    });
  }

}
