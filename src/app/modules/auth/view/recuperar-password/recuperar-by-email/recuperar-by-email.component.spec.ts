import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Si usa HttpClient
import { mensageservice } from '../../../../../shared/services/mensage.service'; // Asegúrate de que la ruta sea correcta
import { RecuperarByEmailComponent } from './recuperar-by-email.component';

describe('RecuperarByEmailComponent', () => {
  let component: RecuperarByEmailComponent;
  let fixture: ComponentFixture<RecuperarByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RecuperarByEmailComponent],
      providers: [mensageservice],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
