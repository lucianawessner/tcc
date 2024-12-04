import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Avaliacao } from './avaliacao.models';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoEndpoint {

  baseUrl: string = '/Avaliacao';

  constructor(private http: HttpClient) { }


  buscarAvaliacao(idPrestador: number, idContratante: number): Observable<any>{
    return this.http.get<any>(`http://localhost:5001/odata${this.baseUrl}?$filter=IdPrestador eq ${idPrestador} and IdContratante eq ${idContratante}`)
  }

  salvar(avaliacao: Avaliacao): Observable<Avaliacao>{
    return this.http.post<Avaliacao>(`${environment.apiUrl}${this.baseUrl}`, avaliacao);
  }

  buscarMedia(usuario: string): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}${this.baseUrl}/Media(${usuario})`)
  }
}
