import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { opinionRequest } from '../models/dto/opinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  
  ruta_servidor: string = `${environment.API_URL}`;
  recurso: string = "opinion";

  constructor(private http:HttpClient) { }

  postOpinion(opinion: opinionRequest){
    return this.http.post(this.ruta_servidor+'/'+ this.recurso, opinion);
  }

}
