import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormularioPrestadorEndpoint } from '../../../../domain/formularioPrestador/formularioPrestador.endpoint';
import { Subject, takeUntil } from 'rxjs';
import { VagaEndpoint } from '../../../../domain/vaga/vaga.endpoint';
import { Prestador, PrestadorDto } from '../../../../domain/usuario-prestador/usuario-prestador.models';
import { FormularioPrestador } from '../../../../domain/formularioPrestador/formularioPrestador.models';
import Swal from 'sweetalert2';
import { ProgressoEndpoint } from '../../../../domain/progresso/progresso.endpoint';
import { Progresso, ProgressoDto } from '../../../../domain/progresso/progresso.models';
import { AvaliacaoPrestadorComponent } from '../avaliacao-prestador/avaliacao-prestador.component';
import { UsuarioDto } from '../../../../domain/login/usuario.dto';


@Component({
  selector: 'app-candidatos-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  templateUrl: './candidatos-dialog.component.html',
  styleUrl: './candidatos-dialog.component.scss'
})
export class CandidatosDialogComponent implements OnInit {

  @Input() IdVaga: number = 0;
  @Input() usuario!: UsuarioDto;

  private readonly destroy$: Subject<any> = new Subject();

  private vagaEndpoint: VagaEndpoint = inject(VagaEndpoint);
  private progressoEndpoint: ProgressoEndpoint = inject(ProgressoEndpoint);
  private dialog = inject(MatDialog);

  public candidatos: PrestadorDto[] = [];
  public progresso: ProgressoDto = new ProgressoDto();

  public ngOnInit(): void {
    this.pegarCandidatos();
  }

  public pegarCandidatos() {
    this.vagaEndpoint.pegarCandidatoPorVaga(this.IdVaga)
    .pipe(takeUntil(this.destroy$))
    .subscribe((dados) => {
      const formularioPrestador = dados.value[0].FormularioPrestador as FormularioPrestador[];
      this.candidatos = formularioPrestador.map(x => {
        return new PrestadorDto({
          IdPrestador: x.UsuarioPrestador.Id,
          Usuario: x.UsuarioPrestador.Usuario,
          Cargo: x.UsuarioPrestador.Cargo,
          Descricao: x.UsuarioPrestador.Descricao,
          Email: x.UsuarioPrestador.Email,
          IdFormularioPrestador: x.Id,
          IdProgresso: x.Progresso[0].Id,
          Progresso: x.Progresso[0],
          Avaliada: x.UsuarioPrestador.Avaliacao.filter(a => a.IdContratante === dados.value[0].IdUsuarioContratante && a.QuemAvaliou === 2).length > 0
        });
      });
    });
  }

  public visualizarVaga(candidato: PrestadorDto) {
    this.progresso.Id = candidato.IdProgresso;

    this.progressoEndpoint.atualizarVisualizacao(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(dados => {
      console.log(dados)
    });
  }

  public aceitarVaga(candidato: PrestadorDto) {
    this.progresso.Id = candidato.IdProgresso;

    this.progressoEndpoint.aceitar(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(dados => {
      if(dados.Data !== null) {
        Swal.fire({
          title: 'Atenção',
          text: 'Vaga aceita com sucesso, aguarde o prestador visualizar para finalizar o processo!',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        this.pegarCandidatos();
      }
    });
  }

  public rejeitarVaga(candidato: PrestadorDto) {
    this.progresso.Id = candidato.IdProgresso;

    this.progressoEndpoint.rejeitar(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(dados => {
      if(dados.Data !== null) {
        Swal.fire({
          title: 'Atenção',
          text: 'Vaga rejeitada com sucesso, você ainda pode mudar de ideia e aceitar o candidato caso desejado',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }

      this.pegarCandidatos();
    });
  }

  avaliacao(prestador: PrestadorDto) {

    if(prestador.Progresso.Aceito === null) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Você precisa aceitar ou rejeitar o prestador antes da avaliação.',
        icon: 'warning',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      return;
    }

    if(prestador.Avaliada){
      Swal.fire({
        title: 'Atenção!',
        text: 'Você já avaliou esse prestador.',
        icon: 'warning',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      return;
    }

    const dialogRef = this.dialog.open(AvaliacaoPrestadorComponent, {
    });

    dialogRef.componentInstance.prestador = prestador;
    dialogRef.componentInstance.usuario = this.usuario;

    dialogRef.afterClosed().subscribe((response) => {
      if(response) {
        this.pegarCandidatos();
      }
    });
  }

  bodyBuilder(): ProgressoDto {
    return {...this.progresso }
  }

  public abrirDialogDeDecisao(candidato: PrestadorDto) {
    Swal.fire({
      title: "Você deseja aceitar ou rejeitar o candidato?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceitar",
      denyButtonText: `Rejeitar`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        this.aceitarVaga(candidato);
      } else if (result.isDenied) {
        this.rejeitarVaga(candidato);
      }
    });
  }
}
