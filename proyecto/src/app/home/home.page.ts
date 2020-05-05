import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'

import { Router } from  "@angular/router";
import { StorageService } from '../storage.service'
import { User } from "../models/user";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  catalogo: any;
  productos : any;
  usuario : User
  dataReady = false

  constructor(
    public servicio: ApiService, 
    private  router:  Router,
    public storageService: StorageService
    ) {}

  async ionViewWillEnter()
  {
    this.storageService.getObject("usuario").then(result => {

      if(!result)
      {
        this.router.navigate(["/landing"])
        return
      }

      this.usuario = result;
      this.dataReady = true;

      if (this.usuario.codigo_tipousuario == 3 ||this.usuario.codigo_tipousuario == 1) 
      {
        this.productos = [];
        this.catalogo = [];
      } 
      else 
      {
        this.servicio.getData().subscribe(m => {
          this.catalogo = m["data"];
          this.productos = m["data"];
        });
      }
      
    });
  }
  
  
  async ngOnInit()
  {
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
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }

}
