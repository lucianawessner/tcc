import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FormularioPrestador } from './formularioPrestador.models';

@Injectable({
  providedIn: 'root'
})
export class FormularioPrestadorEndpoint {

  baseUrl: string = '/FormularioPrestador';

  constructor(private http: HttpClient) { }
  
  candidatarParaVaga(formularioPrestador: FormularioPrestador): Observable<FormularioPrestador>{
    return this.http.post<FormularioPrestador>(`${environment.apiUrl}${this.baseUrl}`, formularioPrestador);
  }

  pegarUsuarioPorVaga(idUsuarioPrestador: number, idVaga: number): Observable<FormularioPrestador[]>{
    return this.http.get<FormularioPrestador[]>(`${environment.apiUrl}${this.baseUrl}?$filter=IdUsuarioPrestador eq ${idUsuarioPrestador} and IdVaga eq ${idVaga}`)
  }
}
