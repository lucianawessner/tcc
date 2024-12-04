import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dataset } from './dataset.models';

@Injectable({
  providedIn: 'root'
})
export class ChartEndpoint {

  baseUrl: string = '/Chart';

  constructor(private http: HttpClient) { }

  buscarRelatorio(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.baseUrl}/BuscarRelatorio`)
  }
}
