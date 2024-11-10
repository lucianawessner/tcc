import { Injectable } from '@angular/core';
import { UsuarioDto } from '../../../domain/login/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioDto: UsuarioDto | null = null;

  constructor() { }

  armazenaUsuario(usuario: UsuarioDto){
    this.usuarioDto = usuario;
  }

  retornaUsuario(): UsuarioDto {
    return this.usuarioDto!;
  }
}
