import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { EmailService } from 'src/app/services/email.service'; // Importamos el servicio de email
import { userInformation } from 'src/app/models/dto/usuario';
import { getInmuebleId } from 'src/app/models/dto/inmueble';
import { alquilerRequest } from 'src/app/models/dto/alquiler';

@Component({
  selector: 'app-make-alquiler',
  templateUrl: './make-alquiler.component.html',
  styleUrls: ['./make-alquiler.component.scss']
})
export class MakeAlquilerComponent implements OnInit {
  id!: number;
  usermain: userInformation = {
    id: 0,
    name: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",
    telephone: '',
    email: '',
    dateAfiiliation: '',
    dateBirth: '',
    linkFotoPerfil: '',
  };
  formPublicar!: FormGroup;
  emailForm!: FormGroup;
  property: getInmuebleId = {
    id: 0,
    address: "",
    timeAntiquity: "",
    inmuebleFotoList: [],
    typeProperty: "",
    price: 0,
    numGuests: 0,
    listCaracteristaInmuebleIcons: [],
    photoOwner: "",
    numBedrooms: 0,
    numBathrooms: 0,
    squareMeter: 0,
    description: "",
    listOpinions: [],
    userContact: {
      id: 0,
      name: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      telephone: "",
      email: "",
      dateAfiiliation: "",
      dateBirth: "",
      linkFotoPerfil: ""
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private userservice: UsuarioService,
    private inmuebleservices: InmuebleService,
    private alquilerservice: AlquilerService,
    private emailService: EmailService, // Inyectamos el servicio de email
    private activedrouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  id_property: number = 0;

  ngOnInit() {
    this.getIdProperty();
    this.load_property();
    this.loadusersesion();
    this.formPublicar = this.formBuilder.group({
      precio: ["", [Validators.required, Validators.min(0)]]
    });
    this.emailForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      message: ["", Validators.required]
    });
  }

  getIdProperty() {
    this.id_property = this.activedrouter.snapshot.params["id"];
  }

  load_property() {
    this.inmuebleservices.getInmueble(this.id_property).subscribe({
      next: (data) => {
        this.property = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadusersesion() {
    let userLocalStorage = this.userservice.getCurrentUserId();
    let currentUserId = userLocalStorage != null ? userLocalStorage : 0;

    this.userservice.getUsuario(currentUserId).subscribe({
      next: (data) => {
        this.usermain = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  nombrecompleto(): string {
    let nombre = this.property.userContact.name + " " + this.property.userContact.apellidoPaterno + " " + this.property.userContact.apellidoMaterno;
    return nombre.toString();
  }

  savealquiler(): void {
    const alquiler: alquilerRequest = {
      client_id: this.usermain.id,
      inmueble_id: this.id_property,
      price: parseInt(this.formPublicar.value.precio),
      transactionDate: new Date(Date.now())
    };
    this.alquilerservice.postAlquiler(alquiler).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Se alquiló exitosamente este inmueble',
          text: 'Visita el menú para descubrir más inmuebles!'
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo realizar la operación',
          text: 'Asegúrese de cancelar sus alquileres previos en este inmueble',
        });
      }
    });
  };

  sendEmail(): void {
    if (this.emailForm.valid) {
      const emailData = this.emailForm.value;
      this.emailService.sendEmail(emailData.email, emailData.subject, emailData.message).subscribe({
        next: () => {
          this.snackBar.open('Correo enviado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Correo enviado exitosamente', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos correctamente', 'Cerrar', { duration: 3000 });
    }
  }
}
