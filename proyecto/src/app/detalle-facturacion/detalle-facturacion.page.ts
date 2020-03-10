import { Component, OnInit } from '@angular/core';
import { StorageService} from '../storage.service'
import { Pipe, PipeTransform } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-detalle-facturacion',
  templateUrl: './detalle-facturacion.page.html',
  styleUrls: ['./detalle-facturacion.page.scss'],
})
//var total;
export class DetalleFacturacionPage implements OnInit {

  constructor(public storageService: StorageService) { }
   total: any
  listaProductos: any[]
  
  async ngOnInit() {
    await this.storageService.getObject('id_usuario').then(result => {
      this.listaProductos = result;

      if (!this.listaProductos) 
      {
        this.listaProductos = [];
      
      }
      this.getTotal(this.listaProductos);
    })
  }
  getProductoCarrito(){

    this.storageService.getObject('id_usuario').then(result => {
      console.log(result);
  
    
    }

    )

  



  }
  getTotal(listaProductos){
    this.total=0;
    for(let vars of listaProductos){
        this.total=this.total+vars.precio;
        console.log('Total: '+this.total);
    }
  }
}
