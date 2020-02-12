import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  catalogo: any;
  productos : any;

  constructor(public servicio: ApiService) {}

  async ngOnInit()
  {
    this.servicio.getData().subscribe(m => {
      this.catalogo = m;
      this.productos = m;
    })
  }

  inicializarProductos()
  {
    this.productos = this.catalogo;
  }

  buscarProducto(evt:any)
  {
    let prod = evt.target.value;

    this.inicializarProductos();

    if (prod && prod.trim() != '')
    {
      this.productos = this.productos.filter((p) =>{
        return (p.name.toLowerCase().indexOf(prod.toLowerCase()) > -1)
      })
    }
  }

}
