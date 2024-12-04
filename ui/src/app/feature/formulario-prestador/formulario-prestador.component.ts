import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { JsonPipe, Location } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { UsuarioDto } from '../../domain/login/usuario.dto';
import { CredentialsService } from '../login/service/credentials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioPrestadorEndpoint } from '../../domain/formularioPrestador/formularioPrestador.endpoint';
import { FormularioPrestador } from '../../domain/formularioPrestador/formularioPrestador.models';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { ProgressoEndpoint } from '../../domain/progresso/progresso.endpoint';
import { Progresso } from '../../domain/progresso/progresso.models';

@Component({
  selector: 'app-formulario-prestador',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './formulario-prestador.component.html',
  styleUrl: './formulario-prestador.component.scss'
})
export class FormularioPrestadorComponent implements OnInit {

  private readonly destroy$ : Subject<any> = new Subject();

  private credentialsService: CredentialsService = inject(CredentialsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private formularioPrestadorEndpoint: FormularioPrestadorEndpoint = inject(FormularioPrestadorEndpoint);
  private progressoEndpoint: ProgressoEndpoint = inject(ProgressoEndpoint);
  private location: Location = inject(Location);
  public router = inject(Router);

  public mainForm: FormGroup = new FormGroup({});
  public usuario: UsuarioDto = new UsuarioDto();
  public id: number = 0;

  errorMessage = signal('');

  public ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!);
    this.usuario = this.credentialsService.credentials!;
    this.criarFormulario();
    this.popularFormulario();
  }

  public candidatar() {
    this.formularioPrestadorEndpoint.candidatarParaVaga(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(resposta => {
      if (resposta) {
        const progresso = new Progresso()
        progresso.IdFormularioPrestador = resposta.Id;
        this.progressoEndpoint.criarProgresso(progresso).subscribe(res => {
          Swal.fire({
            title: 'Atenção!',
            text: 'Candidatura realizada com sucesso, acompanhe pela aba de progresso',
            icon: 'success',
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        })

        this.router.navigate([`home/vagas`]);
      }
    })
  }

  public criarProgresso(formularioPrestador: FormularioPrestador) {
    const progresso = new Progresso()
    progresso.IdFormularioPrestador = formularioPrestador.Id;
    this.progressoEndpoint.criarProgresso(progresso).pipe(takeUntil(this.destroy$));
  }

  updateErrorMessage() {
    // if (this.email.hasError('required')) {
    //   this.errorMessage.set('Insera um valor');
    // } else if (this.email.hasError('email')) {
    //   this.errorMessage.set('Email Invalido');
    // } else {
    //   this.errorMessage.set('');
    // }
  }

  voltarPaginaAnterior(): void {
    this.location.back();
  }

  bodyBuilder(): FormularioPrestador {
    return {...this.mainForm.value}
  }

  public popularFormulario() {
    this.mainForm.patchValue({
      "nome": this.usuario.Nome,
      "email": this.usuario.Email
    })
  }

  public criarFormulario() {
    this.mainForm.addControl("nome", new FormControl(null, [Validators.required]));
    this.mainForm.addControl("email", new FormControl(null, [Validators.required]));
    this.mainForm.addControl("descricao", new FormControl(null, [Validators.required]));
    this.mainForm.addControl("idVaga", new FormControl(this.id, [Validators.required]));
    this.mainForm.addControl("idUsuarioPrestador", new FormControl(this.usuario.Id, [Validators.required]));
  }
}
