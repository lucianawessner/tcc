import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MainValidator } from '../../shared/custom-email-validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.scss'
})
export class AlterarSenhaComponent implements OnInit {

  public mainForm: FormGroup = new FormGroup({});
  public readonly dialogRef = inject(MatDialogRef<AlterarSenhaComponent>);

  public ngOnInit(): void {
    this.criarFormulario();
  }

  public enviar() {
    Swal.fire({
      title: 'Atenção!',
      text: 'Para alterar sua senha, verifique seu email.',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    this.dialogRef.close();
  }

  public criarFormulario() {
    this.mainForm.addControl("Email", new FormControl('', [Validators.required, MainValidator.emailValidator]));
  }
}
