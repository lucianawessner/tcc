import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PreencherCadastroContratanteComponent } from './components/preencher-cadastro-contratante/preencher-cadastro-contratante.component';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-cadastro-contratante',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './cadastro-contratante.component.html',
  styleUrl: './cadastro-contratante.component.scss'
})
export class CadastroContratanteComponent {
  readonly dialog = inject(MatDialog);

  cadastroContratante(){
    console.log(PreencherCadastroContratanteComponent)
    const dialogRef = this.dialog.open(PreencherCadastroContratanteComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
}
}
