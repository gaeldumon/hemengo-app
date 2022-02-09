import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IOrder } from 'src/app/interfaces/order';
import { IProduct } from 'src/app/interfaces/product';


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    /**
     * 
     * @param orderId 
     * @returns 
     */
    public getById(orderId: number): Observable<{ order: IOrder }> {
        return this.http.get<{ order: IOrder }>(
            `${environment.endpoint.order}${orderId}`
        );
    }

    /**
     * 
     * @param userId 
     * @returns 
     */
    public getActiveByUserId(userId: number): Observable<{ orders: IOrder[] }> {
        return this.http.get<{ orders: IOrder[] }>(
            `${environment.endpoint.order}user/${userId}/active`
        );
    }

    /**
     * 
     * @param userId 
     * @returns 
     */
    public getArchiveByUserId(userId: number): Observable<{ orders: IOrder[] }> {
        return this.http.get<{ orders: IOrder[] }>(
            `${environment.endpoint.order}user/${userId}/archive`
        );
    }

    /**
     * 
     * @param orderId 
     * @returns 
     */
    public getProducts(orderId: number): Observable<{ products: IProduct[] }> {
        return this.http.get<{ products: IProduct[] }>(
            `${environment.endpoint.order}${orderId}/products`
        );
    }

    /**
     * 
     * @param payload 
     * @returns 
     */
    public toStatusIsRetrieved(orderId: number): Observable<any> {
        return this.http.patch<any>(
            `${environment.endpoint.order}${orderId}`,
            { StatusId: 4 }
        );
    }
}
