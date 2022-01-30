import { IVendingMachine } from "./vendingMachine";
import { ICity } from "./city";
import { IProduct } from "./product";
import { IStatus } from "./status";

export interface IOrder {
    id: number,
    price: number,
    pickupDate: string,
    pickupToday: boolean,
    StatusId: number,
    status: IStatus,
    VendingMachineId: number,
    vendingMachine: IVendingMachine,
    city: ICity,
    products: IProduct[]
}