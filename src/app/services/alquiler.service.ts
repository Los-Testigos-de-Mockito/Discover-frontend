import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { alquilerRequest, alquilerResponse } from '../models/dto/alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  ruta_servidor: string = `${environment.API_URL}`;
  recurso: string = "alquiler";

  constructor(private http: HttpClient) { }

  postAlquiler(alquiler: alquilerRequest){
    return this.http.post(this.ruta_servidor + "/"+ this.recurso, alquiler)
  }

  getAlquilerXUsuario(id: number){
    return this.http.get<alquilerResponse[]>(this.ruta_servidor+'/'+this.recurso+"/"+id);
  }

  putActivated(id: number){
    return this.http.put(this.ruta_servidor+'/'+this.recurso+"/"+id, id);
  }
}
