import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Prestador } from './usuario-prestador.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPrestadorEndpoint {

  baseUrl: string = '/UsuarioPrestador';

  constructor(private http: HttpClient) { }

  cadastrarPrestador(prestador: Prestador): Observable<Prestador>{
    return this.http.post<Prestador>(`${environment.apiUrl}${this.baseUrl}`, prestador);
  }
}
