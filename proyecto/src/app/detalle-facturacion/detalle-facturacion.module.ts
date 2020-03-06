import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleFacturacionPageRoutingModule } from './detalle-facturacion-routing.module';

import { DetalleFacturacionPage } from './detalle-facturacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleFacturacionPageRoutingModule
  ],
  declarations: [DetalleFacturacionPage]
})
export class DetalleFacturacionPageModule {}
