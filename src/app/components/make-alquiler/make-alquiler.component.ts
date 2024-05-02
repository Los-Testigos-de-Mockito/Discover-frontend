import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';
import { userInformation } from 'src/app/models/dto/usuario';
import { getInmuebleId } from 'src/app/models/dto/inmueble';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { alquilerRequest } from 'src/app/models/dto/alquiler';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-alquiler',
  templateUrl: './make-alquiler.component.html',
  styleUrls: ['./make-alquiler.component.scss']
})
export class MakeAlquilerComponent {
  id!:number;

  usermain:userInformation = {
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
  }
  formPublicar!: FormGroup;
  property: getInmuebleId={
    "id": 0,
    "address": "",
    "timeAntiquity": "",
    "inmuebleFotoList": [],
    "typeProperty":"",
    "price": 0,
    "numGuests": 0,
    "listCaracteristaInmuebleIcons": [],
    "photoOwner": "",
    "numBedrooms": 0,
    "numBathrooms": 0,
    "squareMeter": 0,
    "description": "",
    "listOpinions": [],
    "userContact": {
        "id": 0,
        "name": "",
        "apellidoPaterno":"",
        "apellidoMaterno":"",
        "telephone": "",
        "email": "",
        "dateAfiiliation": "",
        "dateBirth": "",
        "linkFotoPerfil": ""
    }
  };
  constructor(private formBuilder:FormBuilder, private userservice:UsuarioService, private inmuebleservices:InmuebleService,private alquilerservice:AlquilerService, private activedrouter:ActivatedRoute,  private router: Router,
    private snackBar:MatSnackBar) {
  }
  id_property:number=0;
  ngOnInit(){
    this.getIdProperty();
    this.load_property();
    this.loadusersesion();
    this.formPublicar = this.formBuilder.group({
      precio:["", [Validators.required, Validators.min(0)]]
    })
  }
  getIdProperty(){
    this.id_property = this.activedrouter.snapshot.params["id"];
  }

  load_property(){
    this.inmuebleservices.getInmueble(this.id_property).subscribe({
      next:(data)=>{
        this.property=data;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  loadusersesion(){
    let userLocalStorage = this.userservice.getCurrentUserId();

    let currentUserId = userLocalStorage != null ? userLocalStorage : 0;

    this.userservice.getUsuario(currentUserId).subscribe({
      next:(data)=>{
        this.usermain=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  nombrecompleto():string{
    let nombre = this.property.userContact.name+" "+ this.property.userContact.apellidoPaterno+" "+this.property.userContact.apellidoMaterno;
    return nombre.toString();
  }
  savealquiler():void{
    const alquiler:alquilerRequest={
      client_id:this.usermain.id,
      inmueble_id:this.id_property,
      price: parseInt(this.formPublicar.value.precio),
      transactionDate:new Date(Date.now())
    }
    console.log(alquiler)
    this.alquilerservice.postAlquiler(alquiler).subscribe({
      next: (data)  => {
        Swal.fire({
          icon: 'success',
          title: 'Se alquilo exitosamente este inmueble',
          text: 'Visita el menú para descubrir más inmuebles!'
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo realizar la operacion',
          text: 'Asegurese de cancelar sus alquileres previos en este inmueble',
        })
      }
    })
  };
}
