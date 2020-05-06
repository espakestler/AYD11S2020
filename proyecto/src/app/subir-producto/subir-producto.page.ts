import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-subir-producto',
  templateUrl: './subir-producto.page.html',
  styleUrls: ['./subir-producto.page.scss'],
})
export class SubirProductoPage implements OnInit {

  categorias: any[]
  descripcion: any
  categoria_temp:any

  constructor(public servicio: ApiService) { }

  ngOnInit() {

    this.servicio.getCategorias().subscribe(m => {
      this.categorias = m["data"];
    })
    
  }

  insertarProducto(form)
  {
    console.log(form.value.nombre)
    console.log(form.value.precio)
    console.log(form.value.url_foto)
    console.log(this.categoria_temp)
    console.log(form.value.cantidad)
    console.log(this.descripcion)
  }

  guardarCategoria(cate)
  {
    this.categoria_temp = cate
  }

  cerrarSesion()
  {

  }

}
