import { Progresso } from '../../domain/progresso/progresso.models';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AvaliacaoContratanteComponent } from './avaliacao-contratante/avaliacao-contratante.component';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormularioPrestadorEndpoint } from '../../domain/formularioPrestador/formularioPrestador.endpoint';
import { CredentialsService } from '../login/service/credentials.service';
import { UsuarioDto } from '../../domain/login/usuario.dto';
import { Subject, takeUntil } from 'rxjs';
import { Vaga, VagaDto } from '../../domain/vaga/vaga.models';
import { FormularioPrestador } from '../../domain/formularioPrestador/formularioPrestador.models';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AvaliacaoEndpoint } from '../../domain/avaliacao/avaliacao.endpoint';

@Component({
  selector: 'app-progresso',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    SidebarComponent,
    MatDialogModule
  ],
  templateUrl: './progresso.component.html',
  styleUrl: './progresso.component.scss'
})
export class ProgressoComponent implements OnInit {

  private readonly destroy$ : Subject<any> = new Subject();

  private dialog = inject(MatDialog);
  private credentialsService: CredentialsService = inject(CredentialsService);
  private formularioPrestadorEndpoint: FormularioPrestadorEndpoint = inject(FormularioPrestadorEndpoint);

  public usuario: UsuarioDto = new UsuarioDto();
  public vagas: VagaDto[] = [];

  ngOnInit(): void {
    this.usuario = this.credentialsService.credentials!;
    this.pegarMinhasVagas();
  }

  public pegarMinhasVagas(){
    this.formularioPrestadorEndpoint.pegarMinhasVagas(this.usuario.Id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(dados => {
      const vaga = dados.value as FormularioPrestador[];

      this.vagas = vaga.map(x => {
        return new VagaDto
        ({
          Cargo: x.Vaga.Cargo,
          Localizacao: x.Vaga.Descricao,
          Remuneracao: x.Vaga.Remuneracao,
          Descricao: x.Vaga.Descricao,
          Requisitos: x.Vaga.Requisitos,
          Prazo: x.Vaga.Prazo,
          Fechamento: x.Vaga.Fechamento,
          Progresso: x.Progresso[0],
          IdUsuarioContratante: x.Vaga.IdUsuarioContratante,
          Avaliada: x.UsuarioPrestador.Avaliacao.filter(a => a.IdContratante === x.Vaga.IdUsuarioContratante).length > 0
        })
      })
    })
  }

  avaliacao(vaga: VagaDto) {

    if(vaga.Progresso.Aceito === null) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Você precisa estar na 3° etapa antes de realizar a avaliação.',
        icon: 'warning',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      return;
    }

    if(vaga.Avaliada){
      Swal.fire({
        title: 'Atenção!',
        text: 'Você já avaliou esse contratante.',
        icon: 'warning',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      return;
    }

    const dialogRef = this.dialog.open(AvaliacaoContratanteComponent, {
    });

    dialogRef.componentInstance.vaga = vaga;
    dialogRef.componentInstance.usuario = this.usuario;

    dialogRef.afterClosed().subscribe((response) => {
      if(response) {
        this.pegarMinhasVagas();
      }
    });
  }
}
