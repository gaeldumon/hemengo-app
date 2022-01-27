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
     * @param userId 
     * @returns 
     */
    public getByUserId(userId: number): Observable<any> {
        return this.http.get(`${environment.endpoint.order}user/${userId}`);
    }

    /**
     * 
     * @param orderId 
     * @returns 
     */
    public getProducts(orderId: number): Observable<any> {
        return this.http.get(`${environment.endpoint.order}${orderId}/products`);
    }
}
