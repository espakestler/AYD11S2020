import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service'
import { async } from 'q';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  
  producto: any
  

  constructor(private route: ActivatedRoute, public servicio: ApiService) { }

  async ngOnInit() 
  {
    this.route.queryParams.subscribe(params => {

      this.servicio.getProduct(params["codigoProducto"]).subscribe(m => {
        this.producto = m['data'][0];        
      })
    });
  }

}
