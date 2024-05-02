import { Component } from '@angular/core';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { userInformation } from 'src/app/models/dto/usuario';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { alquilerResponse } from 'src/app/models/dto/alquiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import{ ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-historial-alquiler',
  templateUrl: './historial-alquiler.component.html',
  styleUrls: ['./historial-alquiler.component.scss']
})

export class HistorialAlquilerComponent {
  displayedColumns: string[] = ['location', 'fullNameOwner', 'price', 'transactionDate', 'active', 'acciones'];
  dataSource = new MatTableDataSource<alquilerResponse>();

  @ViewChild('paginator')
  paginator!: MatPaginator;
  constructor(private userservice:UsuarioService, private inmuebleservices:InmuebleService, private activedrouter:ActivatedRoute,  private router: Router, private alquilerservice:AlquilerService, private snackbar:MatSnackBar) {
  }

  id!:number
  isActivate:Boolean = false;

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
  listAlquiler!:alquilerResponse[];
  ngOnInit(){
    this.loadusersesion();
    this.getId();
  }

  getId():number{
    this.id = this.activedrouter.snapshot.params["id"];
    return this.id;
  }
  nombrecompleto():string{
    let nombre = 3;
    return nombre.toString();
  }
  loadusersesion(){
    let userLocalStorage = this.userservice.getCurrentUserId();

    let currentUserId = userLocalStorage != null ? userLocalStorage : 0;

    this.userservice.getUsuario(currentUserId).subscribe({
      next:(data)=>{
        this.usermain=data;
        this.load_alquileres();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  load_alquileres(){
    this.alquilerservice.getAlquilerXUsuario(this.usermain.id).subscribe({
      next:(data)=>{
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  activateAlquiler(bool:Boolean):string{
    let a="";
    if(bool){
      a="Activo";
      this.isActivate=true;
    }else{
      a="Inactivo"
      this.isActivate=false;
    }
    return a;
  }
  putActivateAlquiler( id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Es un cambio irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alquilerservice.putActivated(id).subscribe({
          next:(data)=>{
            this.load_alquileres();
          }
        })
        Swal.fire(
          'Alquiler eliminado!',
          'El alquiler se ha vuelto inactivo satisfactoriamente',
          'success'
        )
      }
    })
    }
}
