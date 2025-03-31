import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarPasswordView } from './recuperar-password.view';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Si usa HttpClient
import { mensageservice } from '../../../..//shared/services/mensage.service'; // Asegúrate de que la ruta sea correcta

describe('RecuperarPasswordView', () => {
  let component: RecuperarPasswordView;
  let fixture: ComponentFixture<RecuperarPasswordView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarPasswordView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarPasswordView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
