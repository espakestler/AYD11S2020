import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  Categorias:any[] = [];
  
  constructor(private apiServ: ApiService, private toastController: ToastController,
              private storageService:StorageService, private router:Router) { 
    this.getCategorias();
  }

  ngOnInit() {
  }

  NuevaCategoria(form) {
    console.log(form.value);
    this.apiServ.ejecutarPostPromise('https://gzmqm82c19.execute-api.us-east-1.amazonaws.com/gtec/insertar-categoria', JSON.stringify(form.value))
    .then(data => {
      let estado:boolean = data['success'];
      if(estado) { this.getCategorias(); }
      this.presentToast(data['message']);
    });
  }

  getCategorias() {
    this.apiServ.getCategorias().subscribe(data=>{
      this.Categorias = data['data'];
    });
  }

  cerrarSesion() {
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
