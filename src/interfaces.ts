export interface ICargo {
    type: string
    description: string
    volume: string
}
export interface IShipment {
    id:string
    name: string
    cargo: ICargo[]
    mode: string
    type: string
    destination: string
    origin: string
    services: {type: string, value?: string}[]
    total: string
    status: string
    userId: string
}

export type TShipmentsFromServer = {data: IShipment[], qty: number}

export interface IState {
    pages: {
        pageNumber: number
    },
    shipments: {
        data: {[n:number]:IShipment}
        isLoading: boolean
    },
    form : any

}

export type Order = 'asc' | 'desc';