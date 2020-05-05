import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  new_rating(item_rating:any) : Promise<any> {
    const url = 'https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/rating-vendedor';
    return new Promise((resolve, rejected) => {      
      this.http.post(url, JSON.stringify(item_rating), this.options)
      .subscribe(data => {
        console.log(data);
        let estado = data['success'];
        resolve(estado);
      }, error => rejected(false));
    });
  }

  list_rating(id) : Promise<any> {    
    const url = 'https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/rating-vendedor-list';
    return new Promise((resolve, rejected) => {
      this.http.post(url, { id_vendedor : id }, this.options)
      .subscribe(data => {
        let estado = data['success'];
        if (estado) {
          resolve(data['data']);
        }
      }, error => rejected(false));
    });
  }

}
