import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  constructor(private authService: AuthService, 
              private router: Router) { }
  Usuario:User;

  ngOnInit() {
    this.Usuario = this.authService.currentUserValue;
    console.log(this.Usuario);
  }

  logout(){
    alert("hola")
    this.authService.logout();
    this.router.navigate(['/landing']);
  }

}
