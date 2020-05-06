import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let dataReady = false;


  it('should create', () => {
    expect(component).toEqual(undefined);
  });

  it('La informacion debe de cargarse despues de iniciar la pagina', () => {
    expect(dataReady).toEqual(false);
  });
});
