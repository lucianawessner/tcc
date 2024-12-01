import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { VagaDto } from '../../../domain/vaga/vaga.models';

@Component({
  selector: 'app-avaliacao-contratante',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  templateUrl: './avaliacao-contratante.component.html',
  styleUrl: './avaliacao-contratante.component.scss'
})
export class AvaliacaoContratanteComponent {
  @Input() vaga!: VagaDto;
  
  public readonly router = inject(Router);
  private dialogRef = inject(MatDialogRef<AvaliacaoContratanteComponent>);
  usuario: any;
}
