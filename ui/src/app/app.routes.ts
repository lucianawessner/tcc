import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { PaginaInicialComponent } from './feature/pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pagina-inicial', component: PaginaInicialComponent}
];


