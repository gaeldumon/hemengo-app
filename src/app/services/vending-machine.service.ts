import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IVendingMachine } from 'src/app/interfaces/vendingMachine';
import { ILocker } from 'src/app/interfaces/locker';


@Injectable({
    providedIn: 'root'
})
export class VendingMachineService {

    constructor(private http: HttpClient) { }

    /**
     * Retourne une machine par son id.
     * @param id 
     * @returns 
     */
    public getById(id: number): Observable<{ machine: IVendingMachine }> {
        return this.http.get<{ machine: IVendingMachine }>(
            `${environment.endpoint.vendingMachine}${id}`
        );
    }

    /**
     * Retourne tous les lockers d'une machine par son id.
     * @param machineId 
     * @returns 
     */
    public getLockers(machineId: number): Observable<{ lockers: ILocker[] }> {
        return this.http.get<{ lockers: ILocker[] }>(
            `${environment.endpoint.vendingMachine}${machineId}/lockers`
        );
    }

    /**
     * Retourne l'url du fichier QR Code par son nom (en l'occurence 
     * à cet instant, c'est l'uuid de la machine visée).
     * @param name 
     * @returns 
     */
    public getQrCodeSrc(name: string): string {
        return `${environment.endpoint.upload}qrcode/${name}`;
    }
}
