import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];


