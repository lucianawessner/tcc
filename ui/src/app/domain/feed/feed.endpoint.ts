import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FeedDto } from './feed.dto';
import { Feed } from './feed.models';
import { Response } from '../response/response.models';

@Injectable({
  providedIn: 'root'
})
export class FeedEndpoint {

  baseUrl: string = '/Feed';

  constructor(private http: HttpClient) { }

  pegarTodos(): Observable<Feed[]>{
    return this.http.get<Feed[]>(`${environment.apiUrl}${this.baseUrl}?$expand=UsuarioPrestador($expand=Documento), Documento&$orderby=DataCriacao desc`)
  }

  publicar(dto: FeedDto): Observable<Response<Feed>>{
    const formData = new FormData();
    formData.append('Usuario', dto.Usuario);
    formData.append('Texto', dto.Texto);

    if (dto.Foto) {
      formData.append('Foto', dto.Foto);
    }

    return this.http.post<Response<Feed>>(`${environment.apiUrl}${this.baseUrl}/Publicar`, formData);
  }

  curtir(id: number): Observable<Response<Feed>>{
    return this.http.put<Response<Feed>>(`${environment.apiUrl}${this.baseUrl}/Curtir/${id}`, null);
  }
}
