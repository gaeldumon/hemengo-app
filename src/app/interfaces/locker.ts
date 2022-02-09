import { IProduct } from "./product";

export interface ILocker {
    id: number,
    isFull: boolean,
    lastRefill: string,
    nextPlannedRefill: string
    ProductId: number,
    MatrixElementRef: string,
    products: IProduct[]
}