import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    /**
     * 
     * @param statusId 
     * @returns 
     */
    public getById(productId: number): Observable<any> {
        return this.http.get(`${environment.endpoint.product}${productId}`);
    }
}
