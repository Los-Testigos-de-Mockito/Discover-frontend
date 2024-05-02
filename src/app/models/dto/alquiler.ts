export interface alquilerRequest {
    client_id: number,
    inmueble_id: number,
    price: number,
    transactionDate: Date;
}

export interface alquilerResponse {
    id:number
    location:string
    fullNameOwner:string
    price:number
    transactionDate:Date
    active:boolean
    property_id:number
}
