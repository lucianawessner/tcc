import { Component , inject, OnInit } from '@angular/core';
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
    CadastroContratanteComponent
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
export class LoginComponent {

  showBtnLogin: boolean = false;
  showBtnPrestador: boolean = true;
  isOpen: boolean = true;
  showComponentPrestador: boolean | null = null;
  usuario: string = '';

  private router: Router = inject(Router);

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
    this.router.navigate([''])
  }
}
