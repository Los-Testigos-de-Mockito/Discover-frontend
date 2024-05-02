import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { postInmueble } from 'src/app/models/dto/inmueble';

@Component({
  selector: 'app-publicar-inmueble',
  templateUrl: './publicar-inmueble.component.html',
  styleUrls: ['./publicar-inmueble.component.scss']
})
export class PublicarInmuebleComponent {

  foto_show: string = ""
  foto_array: string[]=[]
  caracteristica_array: number[]=[]
  currentUserId: number = 0
  tiempo_antiguedad:string = ""
  type_property:string = "";
  department:string = "";
  district:string = "";
  province:string = "";
  shared_room:string="";
  formPublicar!: FormGroup;
  isChecked: boolean[] = new Array(30).fill(false);

  onCheckboxChange(id: number) {
    if(this.isChecked[id]){
      this.isChecked[id] = false;
    }else{
      this.isChecked[id] = true;
    }

  }

  constructor(private formBuilder:FormBuilder, private inmuebleService:InmuebleService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar, private userservice:UsuarioService) {}

  ngOnInit(){
    this.reactiveForm();
    this.getCurrentUserId();
  }

  reactiveForm():void {
    this.formPublicar = this.formBuilder.group({
        direccion:["",[Validators.required]],
        precio:["",[Validators.required]],
        n_dormitorios:["",[Validators.required]],
        n_banios:["",[Validators.required]],
        n_huespedes:["",[Validators.required]],
        m2_cuadrados:["",[Validators.required]],
        tiempo_antiguedad:["",[Validators.required]],
        descripcion:[""],
        caracteristicas_inmueble:[""],
        definicion:[""],
        tipoAlojamiento:[""],
        departamento:[""],
        provincia:[""],
        district:[""],
        linkFotoInmueble:[""]
    });
  }

  publicarInmueble():void {

    for(let i = 1; i<=30; i++){
      if(this.isChecked[i-1]){
        this.caracteristica_array.push(i);
      }
    }
    

    const inmueble:postInmueble = {

      "propertyType": this.type_property,
      "sharedRoom": this.shared_room,
      "address": this.formPublicar.get("direccion")!.value,
      "price": parseFloat(this.formPublicar.get("precio")!.value),
      "numBedrooms": parseInt(this.formPublicar.get("n_dormitorios")!.value),
      "numBathrooms": parseInt(this.formPublicar.get("n_banios")!.value),
      "numGuests":  parseInt(this.formPublicar.get("n_huespedes")!.value),
      "squareMeter": parseInt(this.formPublicar.get("m2_cuadrados")!.value),
      "timeAntiquity": this.tiempo_antiguedad,
      "description": this.formPublicar.get("descripcion")!.value,
      "usuario_id": this.currentUserId,
      "departamento": this.department,
      "provincia": this.province,
      "distrito": this.district,
      "foto": this.foto_array,
      "caracteristicasIds": this.caracteristica_array
    }
    console.log(inmueble)
    this.inmuebleService.addInmueble(inmueble).subscribe({
      next: (data)  => {
        this.router.navigate(["/home"]);
        this.snackBar.open("El inmueble se ingresó correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  getCurrentUserId(){
    let userLocalStorage = this.userservice.getCurrentUserId();

    this.currentUserId = userLocalStorage != null ? userLocalStorage : 0;
  }

  changeImageinmueble(){
    this.foto_show = this.formPublicar.get("linkFotoInmueble")!.value;
  }

  addImage(){
    this.foto_array.push(this.formPublicar.get("linkFotoInmueble")!.value);
    this.formPublicar.get('linkFotoInmueble')!.setValue('');
    this.foto_show="";
    this.snackBar.open("Se almaceno la foto correctamente","OK",{duration:3000});
  }

  volverHome():void {
    this.router.navigate(["/home"]);
  }

}
