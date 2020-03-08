import { Component, OnInit } from '@angular/core';
import { StorageService} from '../storage.service'
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(public storageService: StorageService) { }

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

}
