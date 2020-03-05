import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service'
import { async } from 'q';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

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
