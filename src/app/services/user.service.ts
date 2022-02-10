import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TokenService } from './token.service';

import { ICredentialPayload } from 'src/app/interfaces/credential';
import { IUser } from 'src/app/interfaces/user';

import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _payload: ICredentialPayload;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    /**
     * Retourne la payload init au moment du login. Qui correspond à ce qu'il y
     * a dans le token jwt.
     * @see src/app/interfaces/credential
     */
    get payload(): ICredentialPayload {
        return this._payload;
    }

    /**
     * Assigne la payload du token jwt à la propriété payload du user.service.
     */
    public setUserPayload(): void {
        const token = this.tokenService.getToken();

        if (token) {
            this._payload = JSON.parse(window.atob(token.split(".")[1]));
        } else {
            throw new Error("Unable to find token for setting user payload");
        }
    }

    /**
     * Retourne un utilisateur par son id.
     * @param id 
     * @returns 
     */
    public getOne(userId: number): Observable<{ user: IUser }> {
        return this.http.get<{ user: IUser }>(environment.endpoint.user + userId);
    }
}
