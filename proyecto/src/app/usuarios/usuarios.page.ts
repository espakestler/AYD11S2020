import { Component, OnInit } from '@angular/core';

import { Router } from  "@angular/router";
import { StorageService } from '../storage.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  constructor(
    private  router:  Router,
    public storageService: StorageService
  ) { }

  ngOnInit() {
  }


  cerrarSesion()
  {
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }
}
