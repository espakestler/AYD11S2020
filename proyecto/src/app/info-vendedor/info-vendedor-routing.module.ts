import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoVendedorPage } from './info-vendedor.page';

const routes: Routes = [
  {
    path: '',
    component: InfoVendedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoVendedorPageRoutingModule {}
