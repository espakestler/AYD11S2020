import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service'
import { StorageService } from '../storage.service'
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto: any
  dataReady = false

  constructor(private route: ActivatedRoute, public servicio: ApiService, public storageService: StorageService) { }

  async ngOnInit() {

    this.storageService.getObject('codigo_producto').then(async result => {

      this.servicio.getProduct(result).subscribe(m => {
        this.producto = m['data'][0];
        this.dataReady = true
      })
    })
  }

  setProductoCarrito(productoCarrito) {

    var listaProductos: any

    this.storageService.getObject('id_usuario').then(result => {
      listaProductos = result;

      if (!listaProductos) {
        listaProductos = []
      }


      productoCarrito.cantidadVendida = 2;
      listaProductos.push(productoCarrito);
      this.storageService.setObject('id_usuario', listaProductos).then(result => {        
      }).catch(e => {
        console.log("error: " + e);
      });
    })


  }


}
