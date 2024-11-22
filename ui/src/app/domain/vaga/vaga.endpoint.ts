import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vaga } from './vaga.models';

@Injectable({
  providedIn: 'root'
})
export class VagaEndpoint {

  baseUrl: string = '/Vaga';

  constructor(private http: HttpClient) { }

  pegarTodos(): Observable<Vaga[]>{
    return this.http.get<Vaga[]>(`${environment.apiUrl}${this.baseUrl}?$expand=FormularioPrestador&$orderby=Criacao desc`)
  }

  cadastrarVaga(vaga: Vaga): Observable<Vaga>{
    return this.http.post<Vaga>(`${environment.apiUrl}${this.baseUrl}`, vaga);
  }
}
