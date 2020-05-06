import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleFacturacionPage } from './detalle-facturacion.page';

describe('DetalleFacturacionPage', () => {
  let component: DetalleFacturacionPage;
  let fixture: ComponentFixture<DetalleFacturacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleFacturacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleFacturacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
