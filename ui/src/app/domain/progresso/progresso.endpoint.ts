import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Progresso, ProgressoDto } from './progresso.models';
import { Response } from '../response/response.models';

@Injectable({
  providedIn: 'root'
})
export class ProgressoEndpoint {

  baseUrl: string = '/Progresso';

  constructor(private http: HttpClient) { }
  
  criarProgresso(progresso: Progresso): Observable<Progresso>{
    return this.http.post<Progresso>(`${environment.apiUrl}${this.baseUrl}`, progresso);
  }

  atualizarVisualizacao(dto: ProgressoDto): Observable<Progresso> {
    return this.http.put<Progresso>(`${environment.apiUrl}${this.baseUrl}/Visualizacao`, dto);
  }

  aceitar(dto: ProgressoDto): Observable<Response<Progresso>> {
    return this.http.put<Response<Progresso>>(`${environment.apiUrl}${this.baseUrl}/Aceitar`, dto);
  }

  rejeitar(dto: ProgressoDto): Observable<Response<Progresso>> {
    return this.http.put<Response<Progresso>>(`${environment.apiUrl}${this.baseUrl}/Rejeitar`, dto);
  }
}
