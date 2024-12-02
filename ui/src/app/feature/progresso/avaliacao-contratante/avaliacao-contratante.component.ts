import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VagaDto } from '../../../domain/vaga/vaga.models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avaliacao-contratante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  templateUrl: './avaliacao-contratante.component.html',
  styleUrl: './avaliacao-contratante.component.scss'
})
export class AvaliacaoContratanteComponent implements OnInit {

  @Input() vaga!: VagaDto;

  public mainForm: FormGroup = new FormGroup({});

  private dialogRef = inject(MatDialogRef<AvaliacaoContratanteComponent>);

  public ngOnInit(): void {
    this.criarFormulario();
  }

  public criarFormulario() {
    this.mainForm.addControl("estrela1", new FormControl(null, []));
    this.mainForm.addControl("estrela2", new FormControl(null, []));
    this.mainForm.addControl("estrela3", new FormControl(null, []));
    this.mainForm.addControl("estrela4", new FormControl(null, []));
    this.mainForm.addControl("estrela5", new FormControl(null, []));
  }
}
