import { AnyAction } from "redux";
import { IShipment } from "../interfaces";

const X_TOTAL_COUNT: string = 'x-total-count';

class Api {
    url: string
    constructor(url){
        this.url = url;
    };

    private urlGeneratorWithPage(url: string, page: number, limit: number = 20):string{
        return `${url}?_page=${page}&_limit=${limit}`
    };
    public getShipmentsByPage(pageNumber: number):Promise<{data: IShipment[], qty: number|null}>{
        const shipmentGetterUrlWithPage = this.urlGeneratorWithPage(this.url, pageNumber);
        return fetch(shipmentGetterUrlWithPage)
                .then(async res=>{
                    let qty: number | null = null;
                    res.headers.forEach(async (value,key )=>{
                        if(key === X_TOTAL_COUNT){
                            qty =   parseInt(value);
                        }
                    })
                    const data = await res.json();
                    return {
                        data,
                        qty: qty
                    }
                })
                .catch(e=>e)
    }

    public getAllShipments():Promise<{data: IShipment[], qty: number|null}>{
        // const shipmentGetterUrlWithPage = this.urlGeneratorWithPage(this.url, pageNumber);

        return fetch(this.url)
                .then(async res=>{
                    let qty: number | null = null;
                    
                    const data = await res.json();
                    return {
                        data,
                        qty: data.qty
                    }
                })
                .catch(e=>e)
    }
}

export const jsonApi = new Api('http://localhost:3000/shipments')