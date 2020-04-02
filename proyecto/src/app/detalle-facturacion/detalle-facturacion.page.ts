import { Component, OnInit } from '@angular/core';
import { StorageService} from '../storage.service'
import { Pipe, PipeTransform } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';
import { prodDetalle } from '../models/prodDetalle';
import { element } from 'protractor';
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
  
  async ngOnInit() {
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
      this.getTotal(this.listaProductos);
    })

  }
  getProductoCarrito(){
    this.storageService.getObject('id_usuario').then(result => { 
    }
    )

  }

  buscarProducto(id: number){
    console.log('buscando producto xd'+id);
    var ressult=true;
    this.productos.forEach(element => {
      if(element.codigo== id){ ressult= false;}
    });
    return ressult;
}
  getProductoCantidad(){
    for(let ele of this.listaProductos){
      if(this.buscarProducto(ele.codigo)==true){
        this.productos.push(ele);
        var nuevo = new prodDetalle();
        nuevo.codigo = ele.codigo;
        nuevo.cantidad=1;
        nuevo.nombre= ele.nombre;
        nuevo.precio =ele.precio;
        this.lsProd.push(nuevo);
      }else{
        this.lsProd.forEach(element=>{
              if(element.codigo== ele.codigo){
                  element.cantidad +=1;
              }
        });

      }
  }
  console.log('prueba'+this.productos.length+' Prdocutos'+this.listaProductos.length);
  return this.productos;
}
  getTotal(listaProductos){
    this.total=0;
    for(let vars of listaProductos){
        this.total=this.total+vars.precio;
        console.log('Total: '+this.total);
    }
  }
}
