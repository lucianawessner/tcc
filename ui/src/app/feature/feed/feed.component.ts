import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PublicacaoComponent } from '../publicacao/publicacao.component';
import { UsuarioDto } from '../../domain/login/usuario.dto';
import { LoginService } from '../login/service/login.service';
import { FeedEndpoint } from '../../domain/feed/feed.endpoint';
import { Subject, takeUntil } from 'rxjs';
import { Feed } from '../../domain/feed/feed.models';
import { CredentialsService } from '../login/service/credentials.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButton,
    PublicacaoComponent
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  
  private readonly destroy$: Subject<any> = new Subject();

  private feedEndpoint: FeedEndpoint = inject(FeedEndpoint);
  private credentialsService: CredentialsService = inject(CredentialsService);

  public usuario: UsuarioDto = new UsuarioDto(); 
  public publicacoes: Feed[] = []; 

  ngOnInit(): void {
    this.usuario = this.credentialsService.credentials!;
    this.pegarTodos();
  }

  pegarTodos() {
    this.feedEndpoint.pegarTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((dados) => {
        this.publicacoes = dados;
      });
  }

  atualizarFeed(event: any) {
    this.pegarTodos();
  }

  pegarDiretorio(nome: string): string {
    return `assets/${nome}`
  }
}
