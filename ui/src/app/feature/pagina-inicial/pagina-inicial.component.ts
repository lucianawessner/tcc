import { Component, inject, Renderer2, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatIconButton,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FeedComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent {

  public readonly renderer = inject(Renderer2);
  public readonly router = inject(Router);
  private loginService: LoginService = inject(LoginService);
  private credentialsService: CredentialsService = inject(CredentialsService);

  @ViewChild('contentWrapper', { static: false }) contentWrapper: any;

  public mainSidebarHeight(height: any) {
    this.renderer.setStyle(this.contentWrapper.nativeElement, 'min-height', height - 114 + 'px');
  }

  entrar(){
    this.router.navigate(['home/editar-perfil'])
  }

  desconectar(){
    this.credentialsService.setCredentials();
    this.loginService.logout();
  }
}
