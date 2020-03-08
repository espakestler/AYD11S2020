import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getData(){
    return this.http.get('https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/ayds1-getch-productos');
  }

  getProduct(codigo){
    return this.http.get('https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/ayds1-getch-productos?codigo='+codigo);
  }


  
}
