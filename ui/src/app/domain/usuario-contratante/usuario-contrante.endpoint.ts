import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contratante } from './usuario-contratante.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioContratanteEndpoint {

  baseUrl: string = '/UsuarioContratante';

  constructor(private http: HttpClient) { }

  pegarTodosUsuariosContratantes(): Observable<Contratante[]>{
    return this.http.get<Contratante[]>(`${environment.apiUrl}${this.baseUrl}`)
  }

  cadastrarContratante(contratante: Contratante): Observable<Contratante>{
    return this.http.post<Contratante>(`${environment.apiUrl}${this.baseUrl}`, contratante);
  }

  pegarUsuarioPorId(id: number): Observable<any>{
    return this.http.get<any>(`http://localhost:5001/odata${this.baseUrl}?$filter=Id eq ${id}`)
  }

  atualizarContratante(contratante: Contratante): Observable<Contratante>{
    return this.http.put<Contratante>(`${environment.apiUrl}${this.baseUrl}`, contratante);
  }
}
