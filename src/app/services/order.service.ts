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
     * Retourne une commande par son id.
     * @param orderId 
     * @returns 
     */
    public getById(orderId: number): Observable<{ order: IOrder }> {
        return this.http.get<{ order: IOrder }>(
            `${environment.endpoint.order}${orderId}`
        );
    }

    /**
     * Retourne toutes les commandes actives d'un utilisateur.
     * @param userId 
     * @returns 
     */
    public getActiveByUserId(userId: number): Observable<{ orders: IOrder[] }> {
        return this.http.get<{ orders: IOrder[] }>(
            `${environment.endpoint.order}user/${userId}/active`
        );
    }

    /**
     * Retourne toutes les commandes archivées d'un utilisateur (archivées, 
     * récupérées, annulées..).
     * @param userId 
     * @returns 
     */
    public getArchiveByUserId(userId: number): Observable<{ orders: IOrder[] }> {
        return this.http.get<{ orders: IOrder[] }>(
            `${environment.endpoint.order}user/${userId}/archive`
        );
    }

    /**
     * Retourne tous les produits d'une commande.
     * @param orderId 
     * @returns 
     */
    public getProducts(orderId: number): Observable<{ products: IProduct[] }> {
        return this.http.get<{ products: IProduct[] }>(
            `${environment.endpoint.order}${orderId}/products`
        );
    }

    /**
     * Bascule une commande en statut récupérée (statut 4 - retrieved).
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
