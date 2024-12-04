import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioDto } from '../../../../domain/login/usuario.dto';
import { AvaliacaoEndpoint } from '../../../../domain/avaliacao/avaliacao.endpoint';
import { Avaliacao } from '../../../../domain/avaliacao/avaliacao.models';
import { PrestadorDto } from '../../../../domain/usuario-prestador/usuario-prestador.models';

@Component({
  selector: 'app-avaliacao-prestador',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    JsonPipe
  ],
  templateUrl: './avaliacao-prestador.component.html',
  styleUrl: './avaliacao-prestador.component.scss'
})
export class AvaliacaoPrestadorComponent implements OnInit {

  private readonly destroy$ : Subject<any> = new Subject();

  @Input() prestador!: PrestadorDto;
  @Input() usuario!: UsuarioDto;

  public mainForm: FormGroup = new FormGroup({});
  private dialogRef = inject(MatDialogRef<AvaliacaoPrestadorComponent>);
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
    avaliacao.IdContratante = this.usuario.Id;
    avaliacao.IdPrestador = this.prestador.IdPrestador;
    avaliacao.Estrelas = this.calcularAvaliação();
    avaliacao.QuemAvaliou = 2;

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
