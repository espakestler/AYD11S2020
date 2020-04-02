import { Component, OnInit } from '@angular/core';
import { StorageService} from '../storage.service'
import { Pipe, PipeTransform } from '@angular/core';

import { Router } from  "@angular/router";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  listaProductos: any[]
  listaProductos_bak : any[]

  constructor(
    private storageService: StorageService,
    private  router:  Router
    ) { }

  async ngOnInit() {    

    await this.storageService.getObject('id_usuario').then(result => {
      this.listaProductos = result;
      this.listaProductos_bak = result;

      if (!this.listaProductos) 
      {
        this.listaProductos = []
        this.listaProductos_bak = []
      }
    })
    
  }
  
  print()
  {
    for(var i = 0; i < this.listaProductos.length; i++){
        
      console.log(this.listaProductos[i].codigo);
      console.log(this.listaProductos[i].url_foto);
    }
  }

  getProductoCarrito(){

    this.storageService.getObject('id_usuario').then(result => {
      
      console.log(result);
    })
  }

  cerrarSesion()
  {
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }

  buscarProducto(evt:any)
  {
    let prod = evt.target.value;

    this.restaurarProductos();

    if (prod && prod.trim() != '')
    {
      this.listaProductos = this.listaProductos.filter((p) =>{
        return (p.nombre.toLowerCase().indexOf(prod.toLowerCase()) > -1)
      })
    }
  }

  restaurarProductos()
  {
    this.listaProductos = this.listaProductos_bak;
  }
}
