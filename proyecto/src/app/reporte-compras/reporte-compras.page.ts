import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';
import { parse } from 'querystring';
import { element } from 'protractor';
import { ApiService } from '../services/api.service';
import { StorageService} from '../storage.service';
import { User } from '../models/user';
import { Reporteventa } from './repoteventa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-compras',
  templateUrl: './reporte-compras.page.html',
  styleUrls: ['./reporte-compras.page.scss'],
})
export class ReporteComprasPage implements OnInit {

  constructor(public storageService: StorageService,private servicio: ApiService,private router: Router) { }
  Usuario : User;
  listaVenta: Reporteventa

  ngOnInit() {

  

    this.storageService.getCurrentUser().then(result => {
      //let prueba=JSON.parse(result);
      this.Usuario = result;
      console.log('Fecha:'+this.Usuario.fecha_nacimiento);
      console.log('usuario:'+this.Usuario.codigo);
      let data={
        "codigo_usuario":this.Usuario.codigo
      }
      // this.servicio.getVentasCliente(data).subscribe(d =>{
      //    console.log(d);this.servicio.
      //     this.listaVenta = d["data"];
      // });
      this.servicio.ejecutarPosVentas(data).then(ret =>{
        this.listaVenta =ret['data'];
        console.log(this.listaVenta);
      });
     
      usuario(this.Usuario);
    })
  }

  cerrarSesion()
  {
    this.storageService.remove("usuario")
    this.router.navigate(["/login"])
  }



}
export function tipoPago(tipo){
  if(tipo==1){
    return "efectivo";
  }else {
    return "tarjeta";
  }
}
export function usuario(usuario){
  if(usuario===null || usuario===undefined){
    return true;
  }else{
    return false;
  }
}