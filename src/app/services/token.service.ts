import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private router: Router) { }

    /**
     * Enregistre le token d'accés (par exemple lors du login/register) dans le 
     * local storage et redirige vers la route /profile sans paramètres.
     * @param token 
     */
    public saveToken(token: string): void {
        localStorage.setItem(environment.accessToken, token);
        this.router.navigate(['/profile']);
    }

    /**
     * Retourne le token (accessToken) présent dans le local storage ou false si
     * aucun token sous ce nom n'est trouvé.
     * @returns string|false
     */
    public getToken(): string | false {
        const token = localStorage.getItem(environment.accessToken);

        if (!!token) {
            return token;
        } else {
            return false;
        }
    }

    /**
     * Retourne true si un token sous le nom accessToken est trouvé dans le 
     * local storage, false autrement.
     * @returns 
     */
    public isLogged(): boolean {
        const token = localStorage.getItem(environment.accessToken);
        return !!token;
    }

    /**
     * Supprime le token sous le nom accessToken du local storage et redirige
     * vers la route /login sans paramètres.
     */
    public clearToken(): void {
        localStorage.removeItem(environment.accessToken);
        this.router.navigate(['/login']);
    }
}
