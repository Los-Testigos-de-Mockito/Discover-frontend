export interface loginDto {
    email: string;
    password: string;
}

export interface registerUserRequest {
    firstName: string
    lastNameDad: string
    lastNameMom: string
    email:string
    password: string
    numPhone: string
    dni:string
    linkPhotoDni: string
    birthDate: Date
    linkPhotoProfile: string
}

export interface userInformation {
    id:number
    name:string
    apellidoPaterno:string
    apellidoMaterno:string
    dni:string
    telephone:string
    email:string
    dateAfiiliation:string
    dateBirth:string
    linkFotoPerfil:string
}