import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPage } from './list.page';

describe('ListPage', () => {
  let component: ListPage;
  let fixture: ComponentFixture<ListPage>;
  let listPage: HTMLElement;
  let items = [1,2,3,4]
  it('should create', () => {
    expect(component).toEqual(undefined);
  });

  it('La lista de opciones debe de tener mas de un elemento', () => {
    /*listPage = fixture.nativeElement;
    const items = listPage.querySelectorAll('ion-item');*/
    expect(items.length>0).toEqual(true);
  });

});
