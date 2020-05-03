import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoVendedorPageRoutingModule } from './info-vendedor-routing.module';

import { InfoVendedorPage } from './info-vendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoVendedorPageRoutingModule
  ],
  declarations: [InfoVendedorPage],
  exports: [
    InfoVendedorPage
  ]
})
export class InfoVendedorPageModule {}
