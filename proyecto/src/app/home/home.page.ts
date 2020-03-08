import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'

import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from  "@angular/router";
import { StorageService } from '../storage.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  catalogo: any;
  productos : any;

  constructor(public servicio: ApiService, public navCtrl: NavController, private  router:  Router,
    public storageService: StorageService) {}

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

    this.storageService.set('codigo_producto', codP).then( ()=>{
      this.router.navigateByUrl('producto');
    })
  }

  cerrarSesion()
  {
    
  }

}
