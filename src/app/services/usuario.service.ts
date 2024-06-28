import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { loginDto, registerUserRequest, userInformation } from '../models/dto/usuario';
import { environment } from 'src/environment/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  ruta_servidor: string = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  getUsuario(id: number) {
    return this.http.get<userInformation>(this.ruta_servidor + '/contact/' + id);
  }
  addUsuario(usuario: registerUserRequest) {
    return this.http.post(this.ruta_servidor + '/register', usuario);
  }

  login(loginDto: loginDto) {
    return this.http.post<any>(this.ruta_servidor + '/login', loginDto).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_id', res.usuario_id);
      })
    );
  }

  getCurrentUserId(): number | null {
    let userId: string | null = localStorage.getItem('user_id');
    return userId != null ? parseInt(userId) : null;
  }
}
