import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario-vaga',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './formulario-vaga.component.html',
  styleUrl: './formulario-vaga.component.scss'
})
export class FormularioVagaComponent {

}
