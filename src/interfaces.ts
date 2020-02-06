export interface ICargo {
    type: string
    description: string
    volume: string
}
export interface IShipment {
    id:number
    name: string
    cargo: ICargo[]
    mode: string
    type: string
    destination: string
    origin: string
    services: {type: string}[]
    total: string
    status: string
    userID: string
}

export type TShipmentsFromServer = {data: IShipment[], qty: number}

export interface IState {
    pages: {
        pageNumber: number
    },
    shipments: {
        data: {[n:number]:IShipment}
    }
}

export type Order = 'asc' | 'desc';