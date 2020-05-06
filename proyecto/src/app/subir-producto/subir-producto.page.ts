import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from  "@angular/router";
import { StorageService } from '../storage.service'
import { User } from "../models/user";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-subir-producto',
  templateUrl: './subir-producto.page.html',
  styleUrls: ['./subir-producto.page.scss'],
})
export class SubirProductoPage implements OnInit {

  categorias: any[]
  url = 'https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/ayds1-gtech-crear-producto';

  usuario : User

  constructor(
    public servicio: ApiService,
    private http: HttpClient,
    private storageService: StorageService, 
    private  router:  Router,
    private toastController: ToastController
    ) { }

  ngOnInit() {

    this.servicio.getCategorias().subscribe(m => {
      this.categorias = m["data"];
    })

    this.storageService.getObject('usuario').then(result =>{
      this.usuario = result
    });
    
  }

  insertarProducto(form)
  {
    
    let data = 
    {
      id_usuario: this.usuario.codigo,
      nombre: form.value.nombre,
      precio: form.value.precio,
      codigo_categoria: form.value.categoria,
      url_foto: form.value.url_foto,
      cantidad: form.value.cantidad,
      descripcion: form.value.descripcion
    }
    
    this.servicio.executePost(this.url, data);
    form.reset();

    this.showToastMsg("¡Producto registrado exitosamente!")
  }


  async showToastMsg(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'middle',
    });
    toast.present();
  }

  cerrarSesion()
  {
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }

}
