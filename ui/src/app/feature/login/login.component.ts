import { Component , inject, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CadastroPrestadorComponent } from '../cadastro-prestador/cadastro-prestador.component';
import { CadastroContratanteComponent } from '../cadastro-contratante/cadastro-contratante.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioContratanteEndpoint } from '../../domain/usuario-contratante/usuario-contrante.endpoint';
import { LoginEndpoint } from '../../domain/login/login.endpoint';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDto } from '../../domain/login/login.dto';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from './service/login.service';
import { CredentialsService } from './service/credentials.service';
import { AlterarSenhaComponent } from '../alterar-senha/alterar-senha/alterar-senha.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    CadastroPrestadorComponent,
    CadastroContratanteComponent,
    AlterarSenhaComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  animations: [
    trigger('openClose', [
      state('closed', style({
        transform: 'translateX(100%)',
        opacity: 1,
        backgroundColor: '#c9df8a',
        borderRadius: '0 12px 12px 0',
      })),
      state('open', style({
        transform: 'translateX(0)',
        opacity: 1,
        backgroundColor: '#77ab59',
        borderRadius: '12px 0 0 12px'
      })),
      transition('open <=> closed', [
        animate('1s')
      ]),
    ]),

  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  showBtnLogin: boolean = false;
  showBtnPrestador: boolean = true;
  isOpen: boolean = true;
  showComponentPrestador: boolean | null = null;
  usuario: string = '';
  errorMessage = signal('');

  private readonly destroy$: Subject<any> = new Subject();
  public mainForm: FormGroup = new FormGroup({});

  private readonly router: Router = inject(Router);
  private loginEndpoint: LoginEndpoint = inject(LoginEndpoint);
  private credentialsService: CredentialsService = inject(CredentialsService);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.criarFormulario();
  }

  alterarSenha() {
    const dialogRef = this.dialog.open(AlterarSenhaComponent);

  }

  fazerAnimacao() {
    this.isOpen = !this.isOpen;
  }

  fazerDelayBtnLogin() {
    setTimeout(() => {
      this.showBtnLogin = !this.showBtnLogin;
    }, 1000);
  }

  fazerDelayBtnPrestador() {
    setTimeout(() => {
      this.showBtnPrestador = !this.showBtnPrestador;
    }, 1000);
  }

  clickSouPrestador() {
    this.showComponentPrestador = true;
    this.showBtnPrestador = false;
    this.usuario = 'Prestador';
    this.fazerAnimacao();
    this.fazerDelayBtnLogin();
  }

  clickSouContratante() {
    this.showComponentPrestador = false;
    this.showBtnPrestador = false;
    this.usuario = 'Contratante';
    this.fazerAnimacao();
    this.fazerDelayBtnLogin();
  }

  clickLogin() {
    this.showComponentPrestador = null;
    this.showBtnLogin = false;
    this.fazerAnimacao();
    this.fazerDelayBtnPrestador();
  }

  entrar(){
    this.loginEndpoint.login(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(resposta => {
      if (resposta.Data === null) {
        Swal.fire({
          title: 'Atenção!',
          text: resposta.Message,
          icon: 'error',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        this.credentialsService.setCredentials(resposta.Data);
        this.router.navigate(['']);
      }
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  bodyBuilder(): LoginDto {
    return {...this.mainForm.value}
  }

  public criarFormulario() {
    this.mainForm.addControl("usuario", new FormControl('', [Validators.required]));
    this.mainForm.addControl("senha", new FormControl('', [Validators.required]));
  }
}
