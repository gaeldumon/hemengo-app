import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    constructor(private http: HttpClient) { }

    /**
     * 
     * @param statusId 
     * @returns 
     */
    public getById(statusId: number): Observable<any> {
        return this.http.get(`${environment.endpoint.status}${statusId}`);
    }
}
