import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButton],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public readonly router = inject(Router);

  vaga(){
    this.router.navigate(['home/vagas'])
  }

  progresso(){
    this.router.navigate(['home/progresso'])
  }

  relatorio(){
    this.router.navigate(['home/relatorio'])
  }

  feed(){
    this.router.navigate(['home/feed'])
  }
}
