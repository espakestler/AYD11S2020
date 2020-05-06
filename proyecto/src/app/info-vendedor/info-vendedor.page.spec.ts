import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoVendedorPage } from './info-vendedor.page';

describe('InfoVendedorPage', () => {
  let component: InfoVendedorPage;
  let fixture: ComponentFixture<InfoVendedorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoVendedorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoVendedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
