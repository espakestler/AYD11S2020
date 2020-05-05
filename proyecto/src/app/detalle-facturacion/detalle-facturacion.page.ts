import { Component, OnInit } from '@angular/core';
import { StorageService} from '../storage.service'
import { Pipe, PipeTransform } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';
import { prodDetalle } from '../models/prodDetalle';
import { ApiService } from '../services/api.service';
import { element } from 'protractor';
import { DetalleFactura } from '../models/DetalleFactura';
import { parse } from 'querystring';
import { User } from '../models/user';
@Component({
  selector: 'app-detalle-facturacion',
  templateUrl: './detalle-facturacion.page.html',
  styleUrls: ['./detalle-facturacion.page.scss'],
})
//var total;
export class DetalleFacturacionPage implements OnInit {

  constructor(public storageService: StorageService,private servicio: ApiService, ) { }
   total: any;
   listaProductos: any[];
   productos: any[];
   lsProd: prodDetalle []=[];
   detalleFac: DetalleFactura;
   Usuario : User;
  
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
     
    });

    this.storageService.getCurrentUser().then(result => {
      //let prueba=JSON.parse(result);
      
      this.Usuario = result;
      console.log('Fecha:'+this.Usuario.fecha_nacimiento);
      console.log(this.Usuario)
     
    })

  }
  // Metodo para facturacion
  facturar(){
    console.log('enviaremos codclie: '+this.Usuario.codigo+' total: '+this.detalleFac.total)
    let url =' https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/insertar-venta';
    let data = 
      { 
         "codigo_cliente":this.Usuario.codigo,
          "modo_pago":1,
          "total":this.detalleFac.total
        };
     this.servicio.ejecutarPostPromise(url,data).then(ret =>{
          let estado= ret['success'];
          if(estado){
            // console.log('identificador: '+ret['codigo']);
            let idVenta = ret['codigo'];
            this.detalleFac.detalle.forEach(element =>{
                let detobj={
                  "codigo_producto":element.codigo,
                  "codigo_venta":idVenta,
                  "codigo_vendedor":element.vendedor,
                  "cantidad": element.cantidad
                };
                this.servicio.ejecutarPostDetalleVenta(detobj).then(ret=>{
                  let estado2= ret['success'];
                  if(estado2){
                      console.log('Detalle de venta insertado correctamente');
                  }else{
                      console.log('error a insertar detalle de venta');
                  }
                });
            });
          }else{
            console.log('error al insertar venta');
          }
     });
  }
  getProductoCarrito(){
    this.storageService.getObject('id_usuario').then(result => { 
    }
    )

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
        nuevo.vendedor=ele['usuario']['codigo'];
        this.lsProd.push(nuevo); 
   ///codigo nuevo
        this.detalleFac.detalle.push(nuevo);
        this.detalleFac.total += parseInt(ele.cantidadVendida)*parseFloat(ele.precio);
    }
  //console.log('prueba'+this.productos.length+' Prdocutos'+this.listaProductos.length);
  return this.productos;
}
 
}
