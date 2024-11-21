import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { InformacaoDialogComponent } from './components/informacao-dialog/informacao-dialog.component';
import { VagaEndpoint } from '../../domain/vaga/vaga.endpoint';
import { Subject, takeUntil } from 'rxjs';
import { Vaga } from '../../domain/vaga/vaga.models';
import { DatePipe } from '@angular/common';
import { FormularioVagaComponent } from './components/formulario-vaga/formulario-vaga.component';

@Component({
  selector: 'app-vaga',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    SidebarComponent,
    DatePipe
  ],
  templateUrl: './vaga.component.html',
  styleUrl: './vaga.component.scss'
})
export class VagaComponent implements OnInit {

  private readonly destroy$: Subject<any> = new Subject();

  public readonly dialog = inject(MatDialog);
  private vagaEndpoint: VagaEndpoint = inject(VagaEndpoint);

  public vagas: Vaga[] = [];

  public ngOnInit(): void {
    this.pegarTodos();
  }

  pegarTodos() {
    this.vagaEndpoint.pegarTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((dados) => {
        this.vagas = dados;
      });
  }

  abrirInformacoes(vaga: Vaga){
    const dialogRef = this.dialog.open(InformacaoDialogComponent, {
    });

    dialogRef.componentInstance.vaga = vaga;

    dialogRef.afterClosed().subscribe(() => {
      this.pegarTodos();
    });
  }

  FormularioVaga(FormularioVaga: any){
    console.log(FormularioVaga)
    const dialogRef = this.dialog.open(FormularioVagaComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}


