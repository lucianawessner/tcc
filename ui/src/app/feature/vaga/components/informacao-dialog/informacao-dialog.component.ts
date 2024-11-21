import { Component, inject, Input, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Vaga } from '../../../../domain/vaga/vaga.models';
import { CommonModule, DatePipe } from '@angular/common';
import { CredentialsService } from '../../../login/service/credentials.service';
import { UsuarioDto } from '../../../../domain/login/usuario.dto';
import { FormularioPrestadorEndpoint } from '../../../../domain/formularioPrestador/formularioPrestador.endpoint';

@Component({
  selector: 'app-informacao-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    DatePipe
  ],
  templateUrl: './informacao-dialog.component.html',
  styleUrl: './informacao-dialog.component.scss'
})
export class InformacaoDialogComponent implements OnInit {

  @Input() vaga!: Vaga;

  public readonly router = inject(Router);
  private dialogRef = inject(MatDialogRef<InformacaoDialogComponent>);
  private credentialsService: CredentialsService = inject(CredentialsService);
  private formularioPrestadorEndpoint: FormularioPrestadorEndpoint = inject(FormularioPrestadorEndpoint);

  public usuario: UsuarioDto = new UsuarioDto(); 
  public bloquear: boolean = false; 

  public ngOnInit(): void {
    this.usuario = this.credentialsService.credentials!;
    this.bloquearInscricao()
  }

  public formulario(){
    this.router.navigate([`home/formulario-prestador/${this.vaga.Id}`])
    this.dialogRef.close();
  }

  public bloquearInscricao(){
    this.formularioPrestadorEndpoint.pegarUsuarioPorVaga(this.usuario.Id, this.vaga.Id)
    .subscribe(response => {
      if (response.length > 0){
        this.bloquear = true;
      }
    })
  }
}
