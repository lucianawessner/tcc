import { inject, Injectable } from '@angular/core';
import { UsuarioDto } from '../../../domain/login/usuario.dto';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioDto: UsuarioDto | null = null;
  public readonly router = inject(Router);


  constructor() { }

  retornaUsuario(): UsuarioDto {
    return this.usuarioDto!;
  }

  logout(): Observable<boolean> {
    this.router.navigate(['login'])
    return of(true);
  }
}
