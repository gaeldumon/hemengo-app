import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IStatus } from 'src/app/interfaces/status';


@Injectable({
    providedIn: 'root'
})
export class StatusService {

    constructor(private http: HttpClient) { }

    /**
     * Retourne un statut par son id.
     * @param statusId 
     * @returns 
     */
    public getById(statusId: number): Observable<{ status: IStatus }> {
        return this.http.get<{ status: IStatus }>(
            `${environment.endpoint.status}${statusId}`
        );
    }
}
