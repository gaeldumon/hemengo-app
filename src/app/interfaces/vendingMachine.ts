export interface IVendingMachine {
    id: number,
    uuid: string,
    ref: string,
    latitude: number,
    longitude: number,
    street: string,
    maxLineCapacity: number,
    maxRowCapacity: number,
    qrCode: string | null,
    CityId: number
}