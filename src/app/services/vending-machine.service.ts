import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VendingMachineService {

    constructor(private http: HttpClient) { }

    /**
     * Retourne un distributeur.
     * @param id 
     * @returns 
     */
    public getById(id: number): Observable<any> {
        return this.http.get(`${environment.endpoint.vendingMachine}id/${id}`);
    }

    /**
     * 
     * @param name 
     * @returns 
     */
    public getQrCodeSrc(name: string): string {
        return `${environment.endpoint.upload}qrcode/${name}`;
    }
}
