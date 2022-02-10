import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ICredential } from 'src/app/interfaces/credential';
import { IToken } from 'src/app/interfaces/token';

import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    /**
     * Lance une requête de connexion.
     * @param credentials 
     * @returns 
     */
    login(credentials: ICredential): Observable<IToken> {
        return this.http.post<IToken>(`${environment.endpoint.auth}login`, credentials)
    }

    /**
     * Lance une requête d'inscription.
     * @param credentials 
     * @returns 
     */
    register(credentials: ICredential): Observable<IToken> {
        return this.http.post<IToken>(`${environment.endpoint.auth}register`, credentials)
    }
}
