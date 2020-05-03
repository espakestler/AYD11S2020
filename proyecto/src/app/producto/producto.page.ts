import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service'
import { StorageService } from '../storage.service'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { Router } from  "@angular/router";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto: any
  dataReady = false
  cantidad :any
  comentarios:any[]
  codigoProducto : any

  public cantidadArray: Array<string>;
  public cantidadActual: string;

  constructor(
    private route: ActivatedRoute, 
    private servicio: ApiService, 
    private storageService: StorageService, 
    public alertController: AlertController,
    private  router:  Router,    
    private toastController: ToastController
    ) { }

  async ngOnInit() {
    this.cantidadArray = ["Otra", "1", "2", "3" ];
    this.cantidadActual = "1";

    this.storageService.getObject('codigo_producto').then(async result => {   
      this.codigoProducto = result;

      this.servicio.getProduct(result).subscribe(m => {
        this.producto = m['data'][0];
        this.dataReady = true
        
        this.getComentarios(result)
      })
    })
  }

  
  seleccionar(seleccionarCantidad) {
    if (seleccionarCantidad === 'Otra') {
      this.nuevaCantidad()
    } else {
      this.cantidadActual = seleccionarCantidad;
    };

    this.cantidad = seleccionarCantidad;
    console.log(this.cantidad);
  };



  async nuevaCantidad() { const alert = await this.alertController.create({
    header: 'Ingresar la cantidad:',     
    inputs: [
      {
        name: 'cantidad',
        type: 'number'
      }],    
     buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('se cancelo');
            }
          }, {
            text: 'Aceptar',
            handler: (alertData) => { 
              console.log(alertData.cantidad);

              if (alertData.cantidad) {
                let indexFound = this.cantidadArray.findIndex(cont => cont === alertData.cantidad)
                if (indexFound === -1) {
                  this.cantidadArray.push(alertData.cantidad);
                  this.cantidadActual = alertData.cantidad;
                } else {
                  this.cantidadActual = this.cantidadArray[indexFound];
                };
              };   


          }
          }
        ]
});
await alert.present();
      
  };

  setProductoCarrito(productoCarrito) {

    var listaProductos: any

    this.storageService.getObject('id_usuario').then(result => {
      listaProductos = result;

      if (!listaProductos) {
        listaProductos = []
      }


      productoCarrito.cantidadVendida = this.cantidad;
      listaProductos.push(productoCarrito);
      this.storageService.setObject('id_usuario', listaProductos).then(result => {        
      }).catch(e => {
        console.log("error: " + e);
      });
    })

    this.showToast();

  }

  cerrarSesion()
  {
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }

  agregarComentario(form)
  {
    this.storageService.getCurrentUser().then(result =>{

      let data = {
        texto: form.value.texto,
        codigo_producto: this.codigoProducto,
        codigo_usuario: result.codigo,
        nombre_usuario: result.nombre,
        correo_usuario: result.correo
      }

      //this.servicio.executePost('', data)
      console.log(data)
      
      form.reset();
      this.comentarios.push(data)
      //this.getComentarios(this.codigoProducto)
    })
  }

  getComentarios(codigo_producto){
    this.servicio.getComentarios(codigo_producto).subscribe(d => {
      this.comentarios = d["data"];
    });
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: '¡Se agrego al carrito!',
      duration: 1000,
      position: 'middle',
    });
    toast.present();
  }

  async InfoVendedor(user:any) {
    this.storageService.set('codigo_vendedor', user.codigo).then( ()=>{
      this.router.navigateByUrl('/info-vendedor');
    });
  }
}
