import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    public getById(orderId: number): Observable<any> {
        return this.http.get(`${environment.endpoint.order}${orderId}`);
    }

    /**
     * 
     * @param userId 
     * @returns 
     */
    public getActiveByUserId(userId: number): Observable<any> {
        return this.http.get(`${environment.endpoint.order}user/${userId}/active`);
    }

    /**
     * 
     * @param userId 
     * @returns 
     */
    public getArchiveByUserId(userId: number): Observable<any> {
        return this.http.get(`${environment.endpoint.order}user/${userId}/archive`);
    }

    /**
     * 
     * @param orderId 
     * @returns 
     */
    public getProducts(orderId: number): Observable<any> {
        return this.http.get(`${environment.endpoint.order}${orderId}/products`);
    }

    /**
     * 
     * @param payload 
     * @returns 
     */
    public updateStatus(orderId: number, statusId: number): Observable<any> {
        return this.http.patch<any>(
            `${environment.endpoint.order}${orderId}`,
            { StatusId: statusId }
        );
    }
}
