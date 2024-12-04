import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Prestador } from './usuario-prestador.models';
import { UsuarioDocumentoDto } from './usuario-documento.dto';
import { Response } from '../response/response.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPrestadorEndpoint {

  baseUrl: string = '/UsuarioPrestador';

  constructor(private http: HttpClient) { }

  cadastrarPrestador(dto: UsuarioDocumentoDto): Observable<Response<Prestador>>{
    const formData = new FormData();
    formData.append('Nome', dto.Nome);
    formData.append('Email', dto.Email);
    formData.append('Usuario', dto.Usuario);
    formData.append('Senha', dto.Senha);
    formData.append('Cargo', dto.Cargo);
    formData.append('Localizacao', dto.Localizacao);
    formData.append('Descricao', dto.Descricao);
    formData.append('Experiencia', dto.Experiencia);

    if (dto.Foto) {
      formData.append('Foto', dto.Foto);
    }

    return this.http.post<Response<Prestador>>(`${environment.apiUrl}${this.baseUrl}/Criar`, formData);
  }

  pegarUsuarioPorId(id: number): Observable<any>{
    return this.http.get<any>(`http://localhost:5001/odata${this.baseUrl}?$filter=Id eq ${id}&$expand=Documento`)
  }

  atualizarPrestador(dto: UsuarioDocumentoDto): Observable<Response<Prestador>>{
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

    return this.http.put<Response<Prestador>>(`${environment.apiUrl}${this.baseUrl}/Atualizar/${dto.Id}`, formData);
  }
}
