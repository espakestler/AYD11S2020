import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  codigoProducto: any
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.route.queryParams.subscribe(params => {
      this.codigoProducto = params["codigoProducto"];
  });
  }

}
