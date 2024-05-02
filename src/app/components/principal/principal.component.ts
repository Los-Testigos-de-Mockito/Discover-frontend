import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaracteristicasService } from 'src/app/services/caracteristicas.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { userInformation } from 'src/app/models/dto/usuario';
import { allInmueblesResponse } from 'src/app/models/dto/inmueble';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit{
  currentUserId: number = 0;
  property_Filter: string = 'None';
  accommodation_Filter: string = 'None';
  guests_Filter: number = 0;
  bedrooms_Filter: number = 0;
  bathrooms_Filter: number = 0;
  services_Filter: string[] = [];
  modcons_Filter: string[] = [];
  features_Filter: string[] = [];
  price_Filter: string = 'None';
  filters: boolean = true;
  filtradosearch: allInmueblesResponse[] = [];
  filtradofeatures: allInmueblesResponse[] = [];
  sebusco: boolean = false;
  sefiltro: boolean = false;

  properties_array: string[] = [];
  accommodations_array: string[] = [];
  services_array: string[] = [];
  modcons_array: string[] = [];
  features_array: string[] = [];
  price_array: string[] = [
    'desde S/0 hasta S/100',
    'desde S/100 hasta S/300',
    'desde S/300 hasta S/700',
    'desde S/700 hasta S/1500',
    'desde S/1500 hasta S/2500',
    'desde S/2500 hasta S/5000',
    'desde S/5000 hasta S/10000',
    'desde S/10000',
  ];
  properties: allInmueblesResponse[] = [];
  properties_filter!: allInmueblesResponse[];

  random_numbers: number[] = [];
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

  constructor(
    private caracteristicasService: CaracteristicasService,
    private userservice: UsuarioService,
    private inmuebleservices: InmuebleService,
    private activedrouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fillFilterInputs();
    this.getCurrentUserId();
    this.loadUserSesion();
    this.load_properties();
  }

  fillFilterInputs() {
    this.fillPropertyTypeSelect();
    this.fillAccomodationSelect();
    this.fillServicesSelect();
    this.fillModConsSelect();
    this.fillFeaturesSelect();
  }

  loadUserSesion() {
    this.userservice.getUsuario(this.currentUserId).subscribe({
      next: (data) => {
        this.usermain = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCurrentUserId() {
    let userLocalStorage = this.userservice.getCurrentUserId();

    this.currentUserId = userLocalStorage != null ? userLocalStorage : 0;
  }

  fillPropertyTypeSelect(): void {
    this.inmuebleservices.getPropertiesTypes().subscribe((data) => {
      this.properties_array = data;
    });
  }

  fillAccomodationSelect(): void {
    this.inmuebleservices.getSharedRoom().subscribe((data) => {
      this.accommodations_array = data;
    });
  }

  fillServicesSelect(): void {
    this.caracteristicasService.getCaracteristica(1).subscribe((data) => {
      this.services_array = data;
    });
  }

  fillModConsSelect(): void {
    this.caracteristicasService.getCaracteristica(2).subscribe((data) => {
      this.modcons_array = data;
    });
  }

  fillFeaturesSelect(): void {
    this.caracteristicasService.getCaracteristica(4).subscribe((data) => {
      this.features_array = data;
    });
  }

  load_properties() {
    this.inmuebleservices.getInmuebles().subscribe({
      next:(data)=>{
        console.log(data);
        this.properties=data;
        this.define_randoms_values()
        this.properties_filter = data;
        this.filtradosearch = data;
        this.filtradofeatures=data;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }


  define_randoms_values() {
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.floor(Math.random() * (this.properties.length - 1));
      this.random_numbers.push(randomNum);
    }
  }


  filtersearch(event: Event) {
    if (this.sefiltro) {
      this.properties_filter = this.filtradofeatures;
    } else {
      this.properties_filter = this.properties;
    }
    this.filters = false;
    const filter = (event.target as HTMLInputElement).value.toLowerCase();
    let filteredProperties = [];

    filteredProperties = this.properties_filter.filter((prop)=>{
      return prop.department.toLowerCase().includes(filter)||prop.province.toLowerCase().includes(filter)||prop.district.toLowerCase().includes(filter)
    })


    console.log(this.properties_filter);
    this.filtradosearch = filteredProperties;
    this.sebusco = true;
    this.properties_filter = filteredProperties;
  }

  applyFilter() {
    console.log(this.sebusco);
    if (this.sebusco) {
      this.properties_filter = this.filtradosearch;
    } else {
      this.properties_filter = this.properties;
    }
    this.filters = false;
    if (this.property_Filter != 'None') {
      let variable = this.properties_filter.filter(
        (property) => property.properType == this.property_Filter
      );
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.accommodation_Filter != 'None') {
      let variable = this.properties_filter.filter(
        (property) => property.sharedRoom == this.accommodation_Filter
      );
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.guests_Filter != 0) {
      let variable = this.properties_filter.filter(
        (property) => property.numGuest >= this.guests_Filter
      );
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.bedrooms_Filter != 0) {
      let variable = this.properties_filter.filter(
        (property) => property.numBedrooms >= this.bedrooms_Filter
      );
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.bathrooms_Filter != 0) {
      let variable = this.properties_filter.filter(
        (property) => property.numBathrooms >= this.bathrooms_Filter
      );
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.services_Filter.length != 0) {
      let variable = this.properties_filter.filter((property) => {
        let carac_nomb: string[] = []; // Inicializa como un arreglo vacío
        carac_nomb = property.caracteristicaList.map((caracter)=>caracter.featureName)
        return this.services_Filter.every((servicios) =>
        carac_nomb.includes(servicios)
        );
      });
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.modcons_Filter.length != 0) {
      let variable = this.properties_filter.filter((property) => {
        let com_nomb: string[] = []; // Inicializa como un arreglo vacío
        com_nomb = property.caracteristicaList.map((caracter)=>caracter.featureName)
        return this.modcons_Filter.every((servicios) =>
          com_nomb.includes(servicios)
        );
      });
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.features_Filter.length != 0) {
      let variable = this.properties_filter.filter((property) => {
        let feat_nomb: string[] = []; // Inicializa como un arreglo vacío
        feat_nomb = property.caracteristicaList.map((carac)=>carac.featureName)
        console.log(feat_nomb);
        return this.features_Filter.every((servicios) =>
          feat_nomb.includes(servicios)
        );
      });
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.price_Filter != 'None') {
      if (this.price_Filter == 'desde S/0 hasta S/100') {
        console.log('PRUEBA');
        let variable = this.properties_filter.filter(
          (property) => property.price > 0 && property.price <= 100
        );
        this.properties_filter = variable;
      } else if (this.price_Filter == 'desde S/0 hasta S/100') {
        let variable = this.properties_filter.filter(
          (property) => property.price > 0 && property.price <= 100
        );
        this.properties_filter = variable;
      } else if (this.price_Filter == 'desde S/300 hasta S/700') {
        let variable = this.properties_filter.filter(
          (property) => property.price > 300 && property.price <= 700
        );
        this.properties_filter = variable;
      } else if (this.price_Filter == 'desde S/700 hasta S/1500') {
        let variable = this.properties_filter.filter(
          (property) => property.price > 700 && property.price <= 1500
        );
        this.properties_filter = variable;
      } else if (this.price_Filter == 'desde S/1500 hasta S/2500') {
        let variable = this.properties_filter.filter(
          (property) => property.price > 1500 && property.price <= 2500
        );
        this.properties_filter = variable;
      } else if (this.price_Filter == 'desde S/2500 hasta S/5000') {
        let variable = this.properties_filter.filter(
          (property) => property.price > 2500 && property.price <= 5000
        );
        this.properties_filter = variable;
      } else if (this.price_Filter == 'desde S/5000 hasta S/10000') {
        let variable = this.properties_filter.filter(
          (property) => property.price > 5000 && property.price <= 10000
        );
        this.properties_filter = variable;
      } else if (this.price_Filter == 'desde S/10000') {
        let variable = this.properties_filter.filter(
          (property) => property.price > 10000
        );
        this.properties_filter = variable;
      }
    }
    this.filtradofeatures = this.properties_filter;
    this.sefiltro = true;
  }
  eliminarFilters() {
    this.filters = true;
    this.property_Filter = 'None';
    this.accommodation_Filter = 'None';
    this.price_Filter = 'None';
    this.services_Filter = [];
    this.modcons_Filter = [];
    this.features_Filter = [];
    this.guests_Filter = 0;
    this.bedrooms_Filter = 0;
    this.bathrooms_Filter = 0;
    this.filtradosearch = this.properties;
    this.filtradofeatures = this.properties;
    this.sebusco = false;
    this.sefiltro = false;
  }
}
