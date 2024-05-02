import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CaracteristicasService {
  ruta_servidor: string = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  getCaracteristica(caracteristicaId: number) {
    return this.http.get<string[]>(
      this.ruta_servidor + '/caracteristica/' + caracteristicaId.toString()
    );
  }
}
