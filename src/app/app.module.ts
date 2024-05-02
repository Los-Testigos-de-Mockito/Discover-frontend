import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { VisualizeItemComponent } from './components/visualize-item/visualize-item.component';
import { PublicarInmuebleComponent } from './components/publicar-inmueble/publicar-inmueble.component';
import { MakeOpinionComponent } from './components/make-opinion/make-opinion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MakeAlquilerComponent } from './components/make-alquiler/make-alquiler.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { HistorialAlquilerComponent } from './components/historial-alquiler/historial-alquiler.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PrincipalComponent,
    PropertyCardComponent,
    VisualizeItemComponent,
    PublicarInmuebleComponent,
    MakeOpinionComponent,

    LoginComponent,
    RegisterComponent,

      MakeAlquilerComponent,
      ViewProfileComponent,
      HistorialAlquilerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    NgbModule,


    MatDatepickerModule,
    MatNativeDateModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
