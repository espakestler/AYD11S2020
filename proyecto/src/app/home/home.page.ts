import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'

import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  catalogo: any;
  productos : any;

  constructor(public servicio: ApiService, public navCtrl: NavController) {}

  async ngOnInit()
  {
    this.servicio.getData().subscribe(m => {
      this.catalogo = m["data"];
      this.productos = m["data"];
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
        return (p.nombre.toLowerCase().indexOf(prod.toLowerCase()) > -1)
      })
    }
  }
  async openProduct(codP:any)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          codigoProducto: codP
      }
    };

    this.navCtrl.navigateForward(['producto'], navigationExtras);
  }

}
