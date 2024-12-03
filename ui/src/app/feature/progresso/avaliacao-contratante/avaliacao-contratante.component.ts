import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VagaDto } from '../../../domain/vaga/vaga.models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { UsuarioDto } from '../../../domain/login/usuario.dto';
import { Avaliacao } from '../../../domain/avaliacao/avaliacao.models';
import { AvaliacaoEndpoint } from '../../../domain/avaliacao/avaliacao.endpoint';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avaliacao-contratante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    JsonPipe
  ],
  templateUrl: './avaliacao-contratante.component.html',
  styleUrl: './avaliacao-contratante.component.scss'
})
export class AvaliacaoContratanteComponent implements OnInit {

  private readonly destroy$ : Subject<any> = new Subject();

  @Input() vaga!: VagaDto;
  @Input() usuario!: UsuarioDto;

  public mainForm: FormGroup = new FormGroup({});
  private dialogRef = inject(MatDialogRef<AvaliacaoContratanteComponent>);
  private avaliacaoEndpoint: AvaliacaoEndpoint = inject(AvaliacaoEndpoint);

  public ngOnInit(): void {
    this.criarFormulario();
  }

  public calcularAvaliação(): number {
    let nota = 0;

    for (let i = 1; i <= 5; i++) {
      if (this.mainForm.get('estrela' + i)?.value) {
        nota++;
      }
    }

    return nota;
  }

  public avaliar(valor: number): void {
    for (let i = 1; i <= 5; i++) {
      this.mainForm.get('estrela' + i)?.setValue(i <= valor);
    }
  }

  public enviar() {
    this.avaliacaoEndpoint.salvar(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(resposta => {
      if (resposta) {
        Swal.fire({
          title: 'Atenção!',
          text: 'Obrigado por avaliar.',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        this.dialogRef.close(true);
      }
    });
  }

  private bodyBuilder(): Avaliacao {
    const avaliacao = new Avaliacao();

    avaliacao.IdContratante = this.vaga.IdUsuarioContratante;
    avaliacao.IdPrestador = this.usuario.Id
    avaliacao.Estrelas = this.calcularAvaliação();

    return avaliacao;
  }

  public criarFormulario() {
    this.mainForm.addControl("estrela1", new FormControl(false, []));
    this.mainForm.addControl("estrela2", new FormControl(false, []));
    this.mainForm.addControl("estrela3", new FormControl(false, []));
    this.mainForm.addControl("estrela4", new FormControl(false, []));
    this.mainForm.addControl("estrela5", new FormControl(false, []));
  }
}
