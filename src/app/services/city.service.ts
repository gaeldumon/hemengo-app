import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ICity } from 'src/app/interfaces/city';


@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) { }

    /**
     * Retourne une ville par son id.
     * @param id 
     * @returns 
     */
    public getById(id: number): Observable<{city: ICity}> {
        return this.http.get<{city: ICity}>(`${environment.endpoint.city}${id}`);
    }
}
