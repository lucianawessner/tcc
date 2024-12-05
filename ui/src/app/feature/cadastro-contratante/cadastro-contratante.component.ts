import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PreencherCadastroContratanteComponent } from './components/preencher-cadastro-contratante/preencher-cadastro-contratante.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-contratante',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './cadastro-contratante.component.html',
  styleUrl: './cadastro-contratante.component.scss',
})
export class CadastroContratanteComponent {

  readonly dialog = inject(MatDialog);
  public errorMessage = signal('');

  usuario: string = '';
  senha: string = '';
  email: string = '';

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public habilitarCadastrar(): boolean {
    if(this.email !== '' && this.usuario !== '' && this.senha !== ''){
      return false;
    }

    return true;
  }

  public cadastroContratante() {
    const dialogRef = this.dialog.open(PreencherCadastroContratanteComponent);

    dialogRef.componentInstance.email = this.email;
    dialogRef.componentInstance.usuario = this.usuario;
    dialogRef.componentInstance.senha = this.senha;

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        Swal.fire({
          title: 'Atenção!',
          text: 'Cadastro realizado com sucesso',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    });
  }
}
