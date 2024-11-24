import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CredentialsService } from '../login/service/credentials.service';
import { UsuarioDto } from '../../domain/login/usuario.dto';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  
  public readonly router = inject(Router);
  private credentialsService: CredentialsService = inject(CredentialsService);
  
  public usuario: UsuarioDto = new UsuarioDto(); 

  ngOnInit(): void {
    this.usuario = this.credentialsService.credentials!;
  }

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
