import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { ICredentialPayload } from '../interfaces/credential';
import { IUser } from '../interfaces/user';
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
     * 
     */
    get payload(): ICredentialPayload {
        return this._payload;
    }

    /**
     * 
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
     * Get one user by its user id.
     * @param id 
     * @returns 
     */
    public getOne(userId: number): Observable<any> {
        return this.http.get<IUser>(environment.endpoint.user + userId);
    }
}
