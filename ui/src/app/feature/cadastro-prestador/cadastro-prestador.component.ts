import { Component, Input, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-prestador',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './cadastro-prestador.component.html',
  styleUrl: './cadastro-prestador.component.scss'
})
export class CadastroPrestadorComponent implements OnInit {
  @Input() habilitarBotaoCadastrar: boolean = false;

  ngOnInit(): void {
    this.habilitarBotaoCadastrar = true;
  }


}
