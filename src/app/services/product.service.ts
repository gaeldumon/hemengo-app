import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IProduct } from 'src/app/interfaces/product';


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    /**
     * Retourne un produit par son id.
     * @param statusId 
     * @returns 
     */
    public getById(productId: number): Observable<{ product: IProduct }> {
        return this.http.get<{ product: IProduct }>(
            `${environment.endpoint.product}${productId}`
        );
    }
}
