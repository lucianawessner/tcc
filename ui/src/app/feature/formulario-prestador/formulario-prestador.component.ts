import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulario-prestador',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './formulario-prestador.component.html',
  styleUrl: './formulario-prestador.component.scss'
})
export class FormularioPrestadorComponent {
  telefone: string = '';

  formatarTelefone(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); 


    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
    }

    this.telefone = value;
  }


  onKeyPress(event: KeyboardEvent): void {
    const charCode = event.charCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  constructor(private location: Location) {}

  voltarPaginaAnterior(): void {
    this.location.back();
  }

}
