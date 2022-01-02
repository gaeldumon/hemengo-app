import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { TokenService } from './token.service';
import { ICredentialComplete, ICredentialPayload } from '../interfaces/credential';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  payload: ICredentialPayload = {
    id: 0,
    email: '',
    iat: 0,
    exp: 0
  }

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) { }

  getOneUser(id: number): Observable<any> {
    return this.http.get<ICredentialComplete>(environment.userEndpoint + id)
  }


  getUserDetails(): void {
    const token = this.tokenService.getToken();
    console.log("le token : " + token) // à supprimer
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      console.log(JSON.parse(payload)); // à supprimer
      payload = JSON.parse(payload);
      console.log(payload); // à supprimer
      this.payload = payload;
    } else {
      console.log("ça ne marche pas, pas de token") // à supprimer
    }
  }


}
