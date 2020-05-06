import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { tipoPago, usuario, ReporteComprasPage } from './reporte-compras.page';


describe('Reporte Compras', () => {
  let component: ReporteComprasPage;
  
  it('should create', () => {
    expect(component).toEqual(undefined);
  });

    it('Validacion de Tipo Pago',()=>{
      const resp=   tipoPago(1);
      expect((typeof resp)  ).toBe('string');
     }
     
     );
     it('Validacion Usuario Logeado',()=>{
      const resp=   usuario(1);
      expect((typeof resp)  ).toBe("boolean");
     }
     
     );
});