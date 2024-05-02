import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { userInformation } from 'src/app/models/dto/usuario';
import { OpinionService } from 'src/app/services/opinion.service';
import { opinionRequest } from 'src/app/models/dto/opinion';
@Component({
  selector: 'app-make-opinion',
  templateUrl: './make-opinion.component.html',
  styleUrls: ['./make-opinion.component.scss']
})

export class MakeOpinionComponent implements OnInit {
  myForm!:FormGroup;

  id!:number;
  idinmueble!:number;
  constructor(private opinionService: OpinionService , private _formBuilder: FormBuilder,private userservice:UsuarioService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar) {
  }

  getIdInmueble(){
    this.idinmueble = this.activatedRouter.snapshot.params["id"];
    //let inmuebleIDD = parseInt(this.idinmueble.toString())
  }

  ngOnInit(){
    this.loadusersesion();
    this.reactiveForm();
    this.getIdInmueble();
    this.myForm = this._formBuilder.group({
      id:[""],
      descripcion:['',[Validators.required]],
      generalRating: ['', Validators.required],
      locationRating: ['', Validators.required],
      facilitiesRating: ['', Validators.required],
      securityRating: ['', Validators.required],
    });
  }

  reactiveForm():void {
    this.myForm = this._formBuilder.group({
      id:[""],
      descripcion:['',[Validators.required]]
    });
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    generalRating: ['', Validators.required],
    locationRating: ['', Validators.required],
    facilitiesRating: ['', Validators.required],
    securityRating: ['', Validators.required],
  });

  url = "https://i.postimg.cc/k5mRVLnk/84459.png";



  getRatingsAsJson() {
    const generalRating = +(this.secondFormGroup.get('generalRating')?.value || 0);
    const locationRating = +(this.secondFormGroup.get('locationRating')?.value || 0);
    const facilitiesRating = +(this.secondFormGroup.get('facilitiesRating')?.value || 0);
    const securityRating = +(this.secondFormGroup.get('securityRating')?.value || 0);

    const ratingsJson = {
      general: generalRating,
      location: locationRating,
      facilities: facilitiesRating,
      security: securityRating
    };

    console.log(ratingsJson);
    return ratingsJson;
  }


  calculateRatingAverage(ratings: { general: number; location: number; facilities: number; security: number }): number {
  const { general = 0, location = 0, facilities = 0, security = 0 } = ratings;
  const sum = general + location + facilities + security;
  const average = sum / 4;
  return average;
}



  isLinear = false;
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
    linkFotoPerfil: ''
  }
  saveresena():void{
    const ratings= this.getRatingsAsJson();
    var average:number= this.calculateRatingAverage(ratings);
    average = Math.round(average*10)/10;
    console.log(average)
    console.log(this.usermain)
    console.log(this.myForm.get("descripcion")!.value);
    const resena:opinionRequest={
      user_id: this.usermain.id,
      property_id:this.idinmueble, 
      observation:this.myForm.get("descripcion")!.value,
      qualification:average
    }

    this.opinionService.postOpinion(resena).subscribe({
      next: (data)  => {
        this.snackBar.open("La reseña se ha registrado correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  loadusersesion(){
    let userLocalStorage = this.userservice.getCurrentUserId();

    let currentUserId = userLocalStorage != null ? userLocalStorage : 0;
    this.userservice.getUsuario(currentUserId).subscribe({
    next: (data)=>{
      this.usermain=data;
    },
    error: (err) => {
      console.log(err);
    },
  });
  }
  volverinmueble():void {
    this.router.navigate(["/"]);
  }
}
