import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

import { StorageService } from '../storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService,
              public  router:  Router,
              public toastController: ToastController,
              public storageService: StorageService ) { }

  ngOnInit() 
  {
  }

  ionViewWillEnter()
  {
    this.storageService.getObject("usuario").then(result => {

      if(result)
      {
        this.router.navigate(["/home"])
        return
      }
    });  
  }
  
  ionViewDidEnter()
  {
  }

  login(form)
  {
      this.authService.login(form.value.email, form.value.pass)
      .then(res => {
          form.reset()
          this.router.navigate(['/home']);
        }
      ).catch(err => this.presentToast('Los datos son incorrectos o ya existe el usuario'))
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
