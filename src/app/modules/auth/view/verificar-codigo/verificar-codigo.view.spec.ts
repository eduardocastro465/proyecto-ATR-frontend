import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificarCodigoView } from './verificar-codigo.view';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Si usa HttpClient
import { mensageservice } from '../../../..//shared/services/mensage.service'; // Asegúrate de que la ruta sea correcta


describe('VerificarCodigoView', () => {
  let component: VerificarCodigoView;
  let fixture: ComponentFixture<VerificarCodigoView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VerificarCodigoView],
      providers: [mensageservice] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarCodigoView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
