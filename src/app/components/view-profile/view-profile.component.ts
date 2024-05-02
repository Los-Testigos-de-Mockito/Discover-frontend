import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { userInformation } from 'src/app/models/dto/usuario';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent {
  id!: number;
  usermain: userInformation = {
    id: 0,
    name: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    telephone: '',
    email: '',
    dateAfiiliation: '',
    dateBirth: '',
    linkFotoPerfil: '',
  };

  constructor(
    private userservice: UsuarioService,
    private activedrouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getId();
    this.loadusersesion();
  }
  getId() {
    this.id = this.activedrouter.snapshot.params['id'];
  }
  loadusersesion() {
    this.userservice.getUsuario(this.id).subscribe({
      next: (data) => {
        this.usermain = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
