import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../services/rating.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-info-vendedor',
  templateUrl: './info-vendedor.page.html',
  styleUrls: ['./info-vendedor.page.scss'],
})
export class InfoVendedorPage implements OnInit {
  Usuario:User;
  Vendedor:any = { codigo: 0, nombre:'' };
  Comentarios:any[]=[];
  form:FormGroup;
  
  constructor(private route: ActivatedRoute,
              private ratingService: RatingService, 
              private formBuilder: FormBuilder,
              private storageService: StorageService,
              private router: Router) 
    {
      this.storageService.getCurrentUser().then((data) => {
        this.Usuario = data;

        this.getInfo().then((res) => {
          this.form = this.formBuilder.group({
            id_vendedor:[this.Vendedor.codigo],
            id_usuario:[this.Usuario.codigo],
            rating: [3,[Validators.required]],
            comentario: [''],
          });
        });
      });
  }

  ngOnInit() { }

  getInfo() : Promise<any> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe(params => {
        if (params && params.id_vendedor && params.nombre) {
          this.Vendedor.codigo = parseInt(params.id_vendedor);
          this.Vendedor.nombre = params.nombre;  
          this.getRatings();
          resolve(true);
        }
      });
    });
  }

  enviarRating() {
    if (!this.form.valid) { return; }
    this.ratingService.new_rating(this.form.value)
    .then(() => {
      this.getRatings();
    });
  }

  getRatings() {
    this.Comentarios = [];
    this.ratingService.list_rating(this.Vendedor.codigo)
    .then(ret => {
      this.Comentarios = ret;
    });
  }

  cerrarSesion() {
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }

}
