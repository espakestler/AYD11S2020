import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from  "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private authService: AuthService, 
              private  router:  Router,
              private toastController: ToastController) {}

  ngOnInit() {
  }

  registrar(form) {
    this.authService.register(
      form.value.nombre,
      form.value.email,
      form.value.pass,
      form.value.fecha,
      form.value.direccion, "1").then(res => {
        this.router.navigate(['/home']);
      }).catch(err => this.presentToast('No se ha podido registrar, revise sus datos'))
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
