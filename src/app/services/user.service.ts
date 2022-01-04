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

    get payload(): ICredentialPayload {
        return this._payload;
    }

    setUserPayload(): void {
        const token = this.tokenService.getToken();

        if (token) {
            this._payload = JSON.parse(window.atob(token.split(".")[1]));
        }
    }

    getOneUser(id: number): Observable<any> {
        return this.http.get<IUser>(environment.endpoint.user + id)
    }
}