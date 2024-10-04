import { Component } from '@angular/core';
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
        backgroundColor: '#b5d1cf',
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

  isCadastroActive: boolean = false;
  isOpen: boolean = true;
  souPrestador: boolean = true;

  toggleCadastroPanel() {
    this.isCadastroActive = !this.isCadastroActive;
  }

  toggle() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.isCadastroActive = false; // Fecha o painel de cadastro
    } else {
      this.isCadastroActive = true;  // Abre o painel de cadastro
    }
  }

  clickSouPrestador() {
    this.souPrestador = true;
    this.toggle();
  }

  clickSouContratante() {
    this.souPrestador = false;
    this.toggle();
  }
}
