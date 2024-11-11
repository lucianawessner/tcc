import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Feed } from './feed.models';

@Injectable({
  providedIn: 'root'
})
export class FeedEnpoint {

  baseUrl: string = '/Feed';

  constructor(private http: HttpClient) { }

  pegarTodos(): Observable<Feed[]>{
    return this.http.get<Feed[]>(`${environment.apiUrl}${this.baseUrl}?$expand=UsuarioPrestador($expand=Documento), Documento`)
  }
}
