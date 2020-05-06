import { Component, OnInit } from '@angular/core';
import { StorageService} from '../storage.service'
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from  "@angular/router";
import { ToastController } from '@ionic/angular';

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
    private  router:  Router,
    private toastController: ToastController
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
    /*for(var i = 0; i < this.listaProductos.length; i++){
        
      console.log(this.listaProductos[i].codigo);
      console.log(this.listaProductos[i].url_foto);
      console.log(this.listaProductos[i]['usuario']);
    }*/
  }

  quitar(producto){
    // Quita un elemento del carrito
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

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Tarea realizada!',
      duration: 800,
      position: 'middle',
    });
    toast.present();
  }

  async showToastWithCloseButton() {
    const toast = await this.toastController.create({
      message: 'Tarea realizada',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }


}
