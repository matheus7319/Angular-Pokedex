import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonType } from '../models/pokemon-type.model';
import { GenericRequest, PageParams } from '../models/generic-request.model';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTypeService extends BaseService {

  // 'https://pokeapi.co/api/v2'
  private readonly endPoint: string = 'type';

  constructor(
    override http: HttpClient,
  ) {
    super(http)
  }

  getAll(): Observable<GenericRequest> {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append('limit', 20);
    // queryParams = queryParams.append('offset', 0);

    // return this.list(this.endPoint, queryParams)
    return this.list(this.endPoint)
  }

}
