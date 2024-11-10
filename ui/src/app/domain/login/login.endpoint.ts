import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginDto } from './login.dto';
import { UsuarioDto } from './usuario.dto';
import { Response } from '../response/response.models';

@Injectable({
  providedIn: 'root'
})
export class LoginEndpoint {

  baseUrl: string = '/Login';

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<Response<UsuarioDto>>{
    return this.http.post<Response<UsuarioDto>>(`${environment.apiUrl}${this.baseUrl}/Entrar`, loginDto);
  }
}
