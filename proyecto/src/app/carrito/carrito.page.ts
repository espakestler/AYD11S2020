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

  constructor(
    private storageService: StorageService,
    private  router:  Router
    ) { }

  listaProductos: any[]

  async ngOnInit() {    

    await this.storageService.getObject('id_usuario').then(result => {
      this.listaProductos = result;

      if (!this.listaProductos) 
      {
        this.listaProductos = []
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
      console.log(result);;

    
    })
  }

  cerrarSesion()
  {
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }

}
