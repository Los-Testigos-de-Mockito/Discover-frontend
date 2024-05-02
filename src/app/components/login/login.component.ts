import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { loginDto } from 'src/app/models/dto/usuario';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup = {} as FormGroup;
  hidePassword: boolean = true;

  constructor(
    private usuario: UsuarioService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.logInForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  clickButton() {
    let loginDto: loginDto = {
      email: this.logInForm.value.email,
      password: this.logInForm.value.password,
    };

    this.usuario.login(loginDto).subscribe(
      () => {
        this.router.navigate(['/home']);
        this.snackBar.open("Bienvenida a Discover","OK",{duration:3000});
      },
      (error) => {
        alert('Usuario o contraseña incorrectos');
      }
    );
  }
}
