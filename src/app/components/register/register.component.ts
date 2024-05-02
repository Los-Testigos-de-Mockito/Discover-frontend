import { registerUserRequest } from './../../models/dto/usuario';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export function validateAge(minAge: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const timeDiff = currentDate.getTime() - selectedDate.getTime();
    const ageInYears = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));

    if (ageInYears < minAge) {
      return { underage: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  ngPassword: Boolean = false;
  myForm!: FormGroup;
  id!: number;
  currentDate: Date;
  hide = true;
  dniFoto: string = '';
  perfilFoto: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private UsuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.currentDate = new Date();
  }
  ngOnInit() {
    this.reactiveForm();
  }

  reactiveForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      apellidop: ['', [Validators.required, Validators.maxLength(60)]],
      apellidom: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.maxLength(60)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.maxLength(9)]],
      dni: ['', [Validators.required, Validators.maxLength(8)]],
      fecha_nacimiento: ['', Validators.required],
      linkPhotoProfile: ['', Validators.required],
      linkPhotoDni: ['', Validators.required],
    });
  }

  saveUsuario(): void {
    let registeruser: registerUserRequest = {
      firstName: this.myForm.value.name,
      lastNameDad: this.myForm.value.apellidop,
      lastNameMom: this.myForm.value.apellidom,
      email: this.myForm.value.email,
      password: this.myForm.value.password,
      numPhone: this.myForm.value.phone,
      dni: this.myForm.value.dni,
      linkPhotoDni: this.myForm.value.linkPhotoDni,
      birthDate: this.myForm.value.fecha_nacimiento,
      linkPhotoProfile: this.myForm.value.linkPhotoProfile,
    };
    console.log(registeruser);
    this.UsuarioService.addUsuario(registeruser).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
        this.snackBar.open('El usuario se registró correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  volverLogin(): void {
    this.router.navigate(['/']);
  }

  changeImageDni() {
    this.dniFoto = this.myForm.value.linkPhotoDni;
  }

  changeImagePerfil() {
    this.perfilFoto = this.myForm.value.linkPhotoProfile;
  }
}
