import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service'

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  Usuario:User;
  dataReady = false;

  constructor(private router: Router, private storageService: StorageService) { }
  
  ngOnInit() {
    this.storageService.getCurrentUser().then(result => {
      //let prueba=JSON.parse(result);
      
      this.Usuario = result;
      console.log('Fecha:'+this.Usuario.fecha_nacimiento);
      this.dataReady = true;
    })
  }

  logout(){
    this.storageService.remove("usuario")
    this.router.navigate(["/login"]);
  }

  guardar(modif:User){
    console.log('Funcion para guardar informacion');
      //primero elimino informacion
      this.storageService.remove('usuario');
      console.log('modificado: '+modif);
      this.storageService.setObject('usuario',modif);

  }

}
