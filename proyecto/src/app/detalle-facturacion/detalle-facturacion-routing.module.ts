import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleFacturacionPage } from './detalle-facturacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleFacturacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleFacturacionPageRoutingModule {}
