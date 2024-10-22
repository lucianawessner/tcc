import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { EditarPerfilComponent } from './feature/editar-perfil/editar-perfil.component';
import { VagaComponent } from './feature/vaga/vaga.component';
import { ProgressoComponent } from './feature/progresso/progresso.component';
import { RelatorioComponent } from './feature/relatorio/relatorio.component';
import { FeedComponent } from './feature/feed/feed.component';
import { PaginaInicialComponent } from './feature/pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home/feed', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: PaginaInicialComponent,
    children:
    [
      { path: 'feed', component: FeedComponent },
      { path: 'editar-perfil', component: EditarPerfilComponent },
      { path: 'vagas', component: VagaComponent },
      { path: 'progresso', component: ProgressoComponent },
      { path: 'relatorio', component: RelatorioComponent }
    ]
  },
];


