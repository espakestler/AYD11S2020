import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoVendedorPageRoutingModule } from './info-vendedor-routing.module';

import { InfoVendedorPage } from './info-vendedor.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoVendedorPageRoutingModule,
    StarRatingModule,
    ReactiveFormsModule
  ],
  declarations: [InfoVendedorPage],
  exports: [
    InfoVendedorPage
  ]
})
export class InfoVendedorPageModule {}
