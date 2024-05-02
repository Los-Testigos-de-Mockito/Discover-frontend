import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userInformation } from 'src/app/models/dto/usuario';
import { getInmuebleId } from 'src/app/models/dto/inmueble';

export interface Photo {
  color: string;
  cols: number;
  rows: number;
  text: string;
  image: string;
  size: string;
  repeat: string;
  position: string;
}

@Component({
  selector: 'app-visualize-item',
  templateUrl: './visualize-item.component.html',
  styleUrls: ['./visualize-item.component.scss'],
})
export class VisualizeItemComponent {
  id!: number;
  usermain!: userInformation;
  EsPropietario: boolean = false;
  EsComentor: boolean = false;
  property: getInmuebleId = {
    id: 0,
    address: '',
    timeAntiquity: '',
    inmuebleFotoList: [],
    typeProperty: '',
    price: 0,
    numGuests: 0,
    listCaracteristaInmuebleIcons: [],
    photoOwner: '',
    numBedrooms: 0,
    numBathrooms: 0,
    squareMeter: 0,
    description: '',
    listOpinions: [],
    userContact: {
      id: 0,
      name: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telephone: '',
      email: '',
      dateAfiiliation: '',
      dateBirth: '',
      linkFotoPerfil: '',
    },
  };

  id_property: number = 0;
  caracteristicas_ids!: number[];

  constructor(
    private userservice: UsuarioService,
    private inmuebleservices: InmuebleService,
    private activedrouter: ActivatedRoute,
    private router: Router,
    private sanckbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getId();
    this.load_property();
  }

  getId() {
    this.id = this.activedrouter.snapshot.params['id'];
  }

  load_property() {
    this.inmuebleservices.getInmueble(this.id).subscribe({
      next: (data) => {
        this.property = data;
        this.loadUserSesion();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  nombrecompleto(): string {
    let nombre =
      this.property.userContact.name +
      ' ' +
      this.property.userContact.apellidoPaterno +
      ' ' +
      this.property.userContact.apellidoMaterno;
    return nombre.toString();
  }

  loadUserSesion() {
    let userLocalStorage = this.userservice.getCurrentUserId();

    let currentUserId = userLocalStorage != null ? userLocalStorage : 0;

    this.userservice.getUsuario(currentUserId).subscribe({
      next: (data) => {
        this.usermain = data;
        this.BorrarInmueble();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  BorrarInmueble() {
    if (this.property.userContact.id == this.usermain.id) {
      this.EsPropietario = true;
    }
  }

  DeleteInmueble() {
    this.inmuebleservices.deleteInmueble(this.property.id).subscribe({
      next: (data) => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.sanckbar.open('El inmueble se ha eliminado correctamente', 'OK', {
      duration: 3000,
    });
  }
}
