import { Component, Input } from '@angular/core';
import { allInmueblesResponse } from 'src/app/models/dto/inmueble';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
})
export class PropertyCardComponent {
  @Input() property: allInmueblesResponse = {
    id: 0,
    linkPhotoUser: '',
    fullName: '',
    province: '',
    department: '',
    district: '',
    linkPhotoProperty: '',
    price: 0,
    squareMeter: 0,
    numBedrooms: 0,
    numGuest: 0,
    numBathrooms: 0,
    description: '',
    properType: '',
    sharedRoom: '',
    caracteristicaList: [
      {
        featureType: '',
        featureName: '',
      },
    ],
  };
  departament!: string;
  provincia!: string;
  district!: string;

  constructor(private usuarioservice: UsuarioService) {}
}
