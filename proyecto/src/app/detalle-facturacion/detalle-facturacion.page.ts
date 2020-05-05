import { Component, OnInit } from '@angular/core';
import { StorageService} from '../storage.service'
import { Pipe, PipeTransform } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';
import { prodDetalle } from '../models/prodDetalle';
import { element } from 'protractor';
import { DetalleFactura } from '../models/DetalleFactura';
import { parse } from 'querystring';
@Component({
  selector: 'app-detalle-facturacion',
  templateUrl: './detalle-facturacion.page.html',
  styleUrls: ['./detalle-facturacion.page.scss'],
})
//var total;
export class DetalleFacturacionPage implements OnInit {

  constructor(public storageService: StorageService) { }
   total: any;
   listaProductos: any[];
   productos: any[];
   lsProd: prodDetalle []=[];
   detalleFac: DetalleFactura;
  
  async ngOnInit() {
    this.detalleFac = new DetalleFactura();
    await this.storageService.getObject('id_usuario').then(result => {
      this.listaProductos = result;
       
        if(!this.productos){
          this.productos=[];
        }
        this. getProductoCantidad();
      if (!this.listaProductos) 
      {
        this.listaProductos = [];
      
      }
     
    })

  }
  getProductoCarrito(){
    this.storageService.getObject('id_usuario').then(result => { 
    }
    )

  }

  buscarProducto(id: number){
    
    var ressult=true;
    this.productos.forEach(element => {
      if(element.codigo== id){ ressult= false;}
    });
    return ressult;
}
  getProductoCantidad(){
    this.detalleFac.total=0;
     for(let ele of this.listaProductos){
        this.productos.push(ele);
        var nuevo = new prodDetalle();
        nuevo.codigo = ele.codigo;
        nuevo.cantidad= parseInt(ele.cantidadVendida);
        nuevo.nombre= ele.nombre;
        nuevo.precio =ele.precio;
        // console.log('p: '+ele['usuario']['id']);
        this.lsProd.push(nuevo); 
   ///codigo nuevo
        this.detalleFac.detalle.push(nuevo);
        this.detalleFac.total += parseInt(ele.cantidadVendida)*parseFloat(ele.precio);
    }
  //console.log('prueba'+this.productos.length+' Prdocutos'+this.listaProductos.length);
  return this.productos;
}
 
}
