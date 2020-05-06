import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteComprasPageRoutingModule } from './reporte-compras-routing.module';

import { ReporteComprasPage } from './reporte-compras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteComprasPageRoutingModule
  ],
  declarations: [ReporteComprasPage]
})
export class ReporteComprasPageModule {}
