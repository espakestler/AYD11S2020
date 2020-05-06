import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from  "@angular/router";
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form:FormGroup;

  constructor(private authService: AuthService, 
              private router: Router,
              private formBuilder:FormBuilder,
              private toastController: ToastController) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      pass1: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      dir: ['', [Validators.required]],
      tipo: [2, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  registrar() {
    // if (!this.form.valid) { return; }
    let comp_pass = this.form.value.pass === this.form.value.pass1;
    if(!comp_pass) {
      this.presentToast('Las contraseñas no coinciden');
      return;
    }

    this.authService.register(this.form.value).then(res => {
      let estado = res['success'];
      if (estado) { this.router.navigate(['/home']); }      
      this.presentToast(res['message']);        
    }).catch(err => this.presentToast(err));
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
