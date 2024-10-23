import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPrestadorComponent } from './formulario-prestador.component';

describe('FormularioPrestadorComponent', () => {
  let component: FormularioPrestadorComponent;
  let fixture: ComponentFixture<FormularioPrestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPrestadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
