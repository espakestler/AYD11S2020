import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
    })
  };

  constructor(public http: HttpClient) { }

  getData()
  {
    return this.http.get('https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/ayds1-getch-productos');
  }

  getProduct(codigo)
  {
    return this.http.get('https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/ayds1-getch-productos?codigo='+codigo);
  }

  getCategorias()
  {
    return this.http.get('https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/ayds1-getch-categorias')
  }

  getComentarios(codigo_producto)
  {
    return this.http.get('https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/comentarios?codigo=' + codigo_producto)
  }



  ejecutarPosVentas( data) : Promise<any>
  {
    let url ='https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/report-sale';
    return new Promise((resolve, rejected) => {
      this.http.post(url, data, this.options)
      .subscribe(data => {
        resolve(data)
      }, error => rejected(error));
    });    
  }


  executePost(url, data)
  { 
    
    this.http.post(url, data, this.options).subscribe(data => {
      data;
    });
  

  }
  

  ejecutarPostPromise(url, data) : Promise<any>
  {
    return new Promise((resolve, rejected) => {
      this.http.post(url, data, this.options)
      .subscribe(data => {
        resolve(data)
      }, error => rejected(error));
    });    
  }

  ejecutarPostDetalleVenta( data) : Promise<any>
  {
    let url='https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/crear-detalle-venta';
    return new Promise((resolve, rejected) => {
      this.http.post(url, data, this.options)
      .subscribe(data => {
        resolve(data)
      }, error => rejected(error));
    });    
  }

  
}
