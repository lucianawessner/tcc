import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sugestao-vaga',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButton],
  templateUrl: './sugestao-vaga.component.html',
  styleUrl: './sugestao-vaga.component.scss'
})
export class SugestaoVagaComponent {

}
