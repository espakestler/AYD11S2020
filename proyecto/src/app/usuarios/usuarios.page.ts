import { Component, OnInit } from '@angular/core';

import { Router } from  "@angular/router";
import { StorageService } from '../storage.service'
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  constructor(
    private  router:  Router,
    public storageService: StorageService,
    private servicio: ApiService
  ) { }

  usuarios:any[]

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    this.servicio.getUsers().subscribe(d => {
      this.usuarios = d["data"];
    });
  }

  modificarUsuario()
  {
    
  }

  cerrarSesion()
  {
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }
}
