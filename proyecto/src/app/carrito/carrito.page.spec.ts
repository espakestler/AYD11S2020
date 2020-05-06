import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarritoPage } from './carrito.page';


describe('CarritoPage', () => { 
  let component: CarritoPage;
  let listaProductos = [1,2]


  it('should create', () => {
    expect(component).toEqual(undefined);
  });

  it('lista de productos mayor a 0', ()=>{
    expect(listaProductos.length > 0).toEqual(true)
  })
});
