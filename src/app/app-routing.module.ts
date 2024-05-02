import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { PublicarInmuebleComponent } from './components/publicar-inmueble/publicar-inmueble.component';
import { VisualizeItemComponent } from './components/visualize-item/visualize-item.component';
import { MakeOpinionComponent } from './components/make-opinion/make-opinion.component';
import { LoginComponent } from './components/login/login.component';
import { MakeAlquilerComponent } from './components/make-alquiler/make-alquiler.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { HistorialAlquilerComponent } from './components/historial-alquiler/historial-alquiler.component';


const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },
  {
    path:"register", component:RegisterComponent
  },

  {
    path:"visualizar/:id",
  component:VisualizeItemComponent
  },

  { path:'home', component:PrincipalComponent},

  { path: 'property-card', component:PropertyCardComponent },
  { path: 'publicar', component:PublicarInmuebleComponent },
  { path: 'visualizar', component:VisualizeItemComponent },
  {
  path: "resena/:id",
  component:MakeOpinionComponent
  },
  { path: 'resena', component:MakeOpinionComponent },
  {path: "alquiler/:id", component: MakeAlquilerComponent},
  {path: "view-profile/:id", component: ViewProfileComponent},
  {path: "historial-alquiler/:id", component:HistorialAlquilerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
