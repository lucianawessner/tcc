import { Component, inject, Input, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PreencherCadastroComponent } from './components/preencher-cadastro/preencher-cadastro.component';

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
    MatDialogModule
  ],
  templateUrl: './cadastro-prestador.component.html',
  styleUrl: './cadastro-prestador.component.scss'
})
export class CadastroPrestadorComponent implements OnInit {
  @Input() habilitarBotaoCadastrar: boolean = false;
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
  }

  cadastroPrestador(){
    console.log(PreencherCadastroComponent)
    const dialogRef = this.dialog.open(PreencherCadastroComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });

}
}
