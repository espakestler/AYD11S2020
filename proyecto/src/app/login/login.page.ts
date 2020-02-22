import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, 
              public router: Router,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  login(form) {
    this.authService.login(form.value.email, form.value.pass).then( res =>{
      this.router.navigate(['/home']);
    }).catch(err => this.presentToast('los datos son incorrectos o no existe el usuario'))
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
