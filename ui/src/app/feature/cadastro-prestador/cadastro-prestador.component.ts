import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PreencherCadastroComponent } from './components/preencher-cadastro/preencher-cadastro.component';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-prestador',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './cadastro-prestador.component.html',
  styleUrl: './cadastro-prestador.component.scss'
})
export class CadastroPrestadorComponent {
  @Input() habilitarBotaoCadastrar: boolean = false;

  readonly dialog = inject(MatDialog);
  errorMessage = signal('');

  usuario: string = '';
  senha: string = '';
  email: string = '';

  public cadastroPrestador() {
    const dialogRef = this.dialog.open(PreencherCadastroComponent);

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

  public habilitarCadastrar(): boolean {
    if(this.email !== '' && this.usuario !== '' && this.senha !== ''){
      return false;
    }

    return true;
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
