import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private alertController: AlertController, private  router:  Router) {}

  ngOnInit() {
  }

  async registro(form) {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      subHeader: '¡Gracias!',
      message: 'Revisa tu bandeja de correos.',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigateByUrl('home');
  }

}
