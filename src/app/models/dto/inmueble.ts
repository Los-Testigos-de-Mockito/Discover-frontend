export interface allInmueblesResponse {
    id:number
    linkPhotoUser:string
    fullName:string
    province:string
    department:string
    district:string
    linkPhotoProperty:string
    price:number
    squareMeter:number
    numGuest: number
    numBedrooms:number
    numBathrooms:number
    description:string
    properType: string
    sharedRoom: string
    caracteristicaList: [{
        featureType:string
        featureName:string
    }];
}

export interface postInmueble {
    "propertyType": string
    "sharedRoom": string
    "address": string
    "price": number
    "numBedrooms": number
    "numBathrooms": number
    "numGuests": number
    "squareMeter": number
    "timeAntiquity": string
    "description": string
    "usuario_id": number
    "departamento": string
    "provincia": string
    "distrito": string
    "foto": string[],
    "caracteristicasIds": number[]
}

export interface getInmuebleId {
    "id":number
    "address": string
    "timeAntiquity": string
    "inmuebleFotoList": string[],
    "typeProperty":string,
    "price": number,
    "numGuests": number,
    "listCaracteristaInmuebleIcons":
        {
        "nombre": string
        "icon": string
        }[]
    ,
    "photoOwner": string,
    "numBedrooms": number,
    "numBathrooms": number,
    "squareMeter": number,
    "description": string,
    "listOpinions":
        {
        "description": "string",
        "stars": number
        }[]
    ,
    "userContact": {
        "id": number,
        "name": string,
        "apellidoPaterno":string,
        "apellidoMaterno":string,
        "telephone": string,
        "email": string,
        "dateAfiiliation": string,
        "dateBirth": string,
        "linkFotoPerfil": string
    }
}
