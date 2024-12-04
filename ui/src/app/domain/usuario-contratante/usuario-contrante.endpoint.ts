import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contratante } from './usuario-contratante.models';
import { environment } from '../../../environments/environment';
import { UsuarioDocumentoDto } from '../usuario-prestador/usuario-documento.dto';
import { Response } from '../response/response.models';

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
    return this.http.get<any>(`http://localhost:5001/odata${this.baseUrl}?$filter=Id eq ${id}&$expand=Documento`)
  }

  atualizarContratante(dto: UsuarioDocumentoDto): Observable<Response<Contratante>>{
    const formData = new FormData();
    formData.append('Usuario', dto.Usuario);
    formData.append('Nome', dto.Nome);
    formData.append('Descricao', dto.Descricao);
    formData.append('Cargo', dto.Cargo);
    formData.append('Experiencia', dto.Experiencia);
    formData.append('Email', dto.Email);

    if (dto.Foto) {
      formData.append('Foto', dto.Foto);
    }

    return this.http.put<Response<Contratante>>(`${environment.apiUrl}${this.baseUrl}/Atualizar/${dto.Id}`, formData);
  }
}
