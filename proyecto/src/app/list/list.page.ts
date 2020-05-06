import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(public http: HttpClient) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }


  post(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':'application/json',
      })
    };

    let formData = {
      'user': 'hpablo677@gmail.com',
      'pass': '123'
    };

    var url = 'https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/login';
    let response = this.http.post(url, formData, httpOptions);

    response.subscribe(data =>{
      console.log(data);
    })
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
