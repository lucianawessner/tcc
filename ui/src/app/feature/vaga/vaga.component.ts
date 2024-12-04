import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InformacaoDialogComponent } from './components/informacao-dialog/informacao-dialog.component';
import { VagaEndpoint } from '../../domain/vaga/vaga.endpoint';
import { combineLatest, map, startWith, Subject, takeUntil } from 'rxjs';
import { Vaga } from '../../domain/vaga/vaga.models';
import { DatePipe } from '@angular/common';
import { FormularioVagaComponent } from './components/formulario-vaga/formulario-vaga.component';
import { UsuarioDto } from '../../domain/login/usuario.dto';
import { CredentialsService } from '../login/service/credentials.service';
import { CandidatosDialogComponent } from './components/candidatos-dialog/candidatos-dialog.component';

@Component({
  selector: 'app-vaga',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    SidebarComponent,
    DatePipe,
  ],
  templateUrl: './vaga.component.html',
  styleUrl: './vaga.component.scss',
})
export class VagaComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject();
  private keywordSubject = new Subject<string>();
  private locationSubject = new Subject<string>();

  public readonly dialog = inject(MatDialog);
  private vagaEndpoint: VagaEndpoint = inject(VagaEndpoint);
  private credentialsService: CredentialsService = inject(CredentialsService);

  public usuario: UsuarioDto = new UsuarioDto();
  public vagas: Vaga[] = [];
  public filteredVagas: Vaga[] = [];
  public isLoading: boolean = true; // Variável para controlar o estado de carregamento

  public ngOnInit(): void {
    this.usuario = this.credentialsService.credentials!;

    if (this.usuario.TipoUsuario === 1) {
      this.pegarTodos();
    } else {
      this.pegarPorContratante();
    }
  }

  pegarTodos() {
    this.vagaEndpoint
      .pegarTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((dados) => {
        this.vagas = dados;
        this.filteredVagas = dados;
      });

    combineLatest([
      this.keywordSubject.pipe(startWith('')),
      this.locationSubject.pipe(startWith('')),
    ])
      .pipe(
        takeUntil(this.destroy$),
        map(([keyword, location]) => {
          return this.vagas.filter((vaga) => {
            const keywordMatch =
              !keyword ||
              vaga.Cargo?.toLowerCase().includes(keyword.toLowerCase()) ||
              vaga.Remuneracao?.toString()
                .toLowerCase()
                .includes(keyword.toLowerCase());
            const locationMatch =
              !location ||
              vaga.Localizacao?.toLowerCase().includes(location.toLowerCase());
            return keywordMatch && locationMatch;
          });
        })
      )
      .subscribe((result) => {
        this.filteredVagas = result;
        this.isLoading = false;
      });
  }

  onSearchKeyword(term: string) {
    this.keywordSubject.next(term);
  }

  onSearchLocation(term: string) {
    this.locationSubject.next(term);
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  pegarPorContratante() {
    this.vagaEndpoint
      .pegarPorContratante(this.usuario.Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((dados) => {
        this.filteredVagas = dados;
        this.isLoading = false;
      });
  }

  abrirInformacoes(vaga: Vaga) {
    const dialogRef = this.dialog.open(InformacaoDialogComponent, {
      minWidth: '700px',
      maxWidth: '700px',
    });

    dialogRef.componentInstance.vaga = vaga;

    dialogRef.afterClosed().subscribe(() => {
      this.pegarTodos();
    });
  }

  abrirVaga() {
    const dialogRef = this.dialog.open(FormularioVagaComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      this.pegarPorContratante();
    });
  }

  abrirCandidatos(idVaga: number) {
    const dialogRef = this.dialog.open(CandidatosDialogComponent, {});

    dialogRef.componentInstance.IdVaga = idVaga;
    dialogRef.componentInstance.usuario = this.usuario;

    dialogRef.afterClosed().subscribe(() => {});
  }
}
