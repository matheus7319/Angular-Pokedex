import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { GenericRequest } from '../models/generic-request.model';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public readonly API = `${environment.API}`;
  private readonly httpRegex = /^https?:/

  constructor(public http: HttpClient) { }

  public getByUrl<T>(url: string, queryParams: HttpParams = new HttpParams()): Observable<T> {
    if (url == '' || typeof url != typeof '' || !this.httpRegex.test(url)) {
      throw Error('url não é uma string: ' + url);
    }
    return this.http.get<T>(url, { params: queryParams });
  }

  // Paginated List
  public list(endpoint: string, queryParams: HttpParams = new HttpParams()): Observable<GenericRequest> {
    if (typeof endpoint != typeof '' || endpoint == '') {
      throw Error('endpoint não é uma string');
    }
    return this.http.get<GenericRequest>(`${this.API}/${endpoint}/`, { params: queryParams });
  }
}
