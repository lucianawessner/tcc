import { Component, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { FeedComponent } from '../feed/feed.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input' ;
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../login/service/login.service';
import { CredentialsService } from '../login/service/credentials.service';
import { UsuarioDto } from '../../domain/login/usuario.dto';
import { CommonModule } from '@angular/common';
import { AddFileDownloadPipe } from '../shared/pipes/add-file-download.pipe';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatIconButton,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FeedComponent,
    SidebarComponent,
    RouterOutlet,
    AddFileDownloadPipe
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent implements OnInit {

  public readonly renderer = inject(Renderer2);
  public readonly router = inject(Router);
  private loginService: LoginService = inject(LoginService);
  private credentialsService: CredentialsService = inject(CredentialsService);

  imagePreview: string = 'assets/default-user.jpg';
  public usuario: UsuarioDto = new UsuarioDto();

  @ViewChild('contentWrapper', { static: false }) contentWrapper: any;

  public mainSidebarHeight(height: any) {
    this.renderer.setStyle(this.contentWrapper.nativeElement, 'min-height', height - 114 + 'px');
  }

  public ngOnInit(): void {
    this.usuario = this.credentialsService.credentials!;
    if(this.usuario.Foto){
      this.imagePreview = `assets/${this.usuario.Foto}`;
    }
  }

  entrar(){
    this.router.navigate(['home/editar-perfil'])
  }

  desconectar(){
    this.credentialsService.setCredentials();
    this.loginService.logout();
  }
}
