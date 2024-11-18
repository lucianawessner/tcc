import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-formulario-prestador',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './formulario-prestador.component.html',
  styleUrl: './formulario-prestador.component.scss'
})
export class FormularioPrestadorComponent {
  // telefone: string = '';

  // formatarTelefone(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   let value = input.value.replace(/\D/g, '');


  //   if (value.length > 11) {
  //     value = value.slice(0, 11);
  //   }

  //   if (value.length <= 10) {
  //     value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
  //   } else {
  //     value = value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
  //   }

  //   this.telefone = value;
  // }


  // onKeyPress(event: KeyboardEvent): void {
  //   const charCode = event.charCode;

  //   if (charCode < 48 || charCode > 57) {
  //     event.preventDefault();
  //   }
  // }

  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor(private location: Location) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Insera um valor');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Email Invalido');
    } else {
      this.errorMessage.set('');
    }
  }

  voltarPaginaAnterior(): void {
    this.location.back();
  }

}
