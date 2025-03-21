import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarByEmailComponent } from './recuperar-by-email.component';

describe('RecuperarByEmailComponent', () => {
  let component: RecuperarByEmailComponent;
  let fixture: ComponentFixture<RecuperarByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarByEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
