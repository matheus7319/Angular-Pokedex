import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericRequest, PageParams } from '../models/generic-request.model';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends BaseService {

  // 'https://pokeapi.co/api/v2'
  private readonly endPoint: string = 'pokemon';
  private readonly alphaNumRegex = /^[a-zA-Z0-9]+$/;

  constructor(
    override http: HttpClient,
  ) {
    super(http)
  }

  getAll(pageParams: PageParams = new PageParams()): Observable<GenericRequest> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('limit', pageParams.limit);
    queryParams = queryParams.append('offset', (pageParams.limit * pageParams.page));

    return this.list(this.endPoint, queryParams)
  }

  getByName(nameOrId: string): Observable<Pokemon> {
    if (!this.alphaNumRegex.test(nameOrId) && nameOrId != '') {
      throw Error('Parametro recebido é diferente de número ou letra');
    }
    return this.getByUrl<Pokemon>(`${this.API}/${this.endPoint}/${nameOrId}`);
  }
}
