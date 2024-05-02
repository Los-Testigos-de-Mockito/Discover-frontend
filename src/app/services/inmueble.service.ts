import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import {
  allInmueblesResponse,
  getInmuebleId,
  postInmueble,
} from '../models/dto/inmueble';

@Injectable({
  providedIn: 'root',
})
export class InmuebleService {
  ruta_servidor: string = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  getInmuebles() {
    return this.http.get<allInmueblesResponse[]>(
      this.ruta_servidor + '/inmuebles'
    );
  }
  getInmueble(id: number) {
    return this.http.get<getInmuebleId>(
      this.ruta_servidor + '/inmuebles/' + id.toString()
    );
  }

  getPropertiesTypes() {
    return this.http.get<string[]>(this.ruta_servidor + '/properties-types');
  }

  getSharedRoom() {
    return this.http.get<string[]>(this.ruta_servidor + '/shared-room');
  }

  addInmueble(inmueble: postInmueble) {
    return this.http.post<any>(this.ruta_servidor + '/inmuebles', inmueble);
  }

  deleteInmueble(id: number) {
    return this.http.delete(this.ruta_servidor + '/inmuebles/' + id.toString());
  }
}
