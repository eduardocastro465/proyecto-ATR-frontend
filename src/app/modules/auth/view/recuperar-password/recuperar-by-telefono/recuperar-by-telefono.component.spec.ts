import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarByTelefonoComponent } from './recuperar-by-telefono.component';

describe('RecuperarByTelefonoComponent', () => {
  let component: RecuperarByTelefonoComponent;
  let fixture: ComponentFixture<RecuperarByTelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarByTelefonoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarByTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
