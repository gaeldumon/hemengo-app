import { IVendingMachine } from "./vendingMachine";
import { ICity } from "./city";
import { IProduct } from "./product";

export interface IOrder {
    id: number,
    price: number,
    pickupDate: string,
    status: string,
    VendingMachineId: number,
    vendingMachine: IVendingMachine,
    city: ICity,
    products: IProduct[]
}