import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private router: Router) { }

    /**
     * Enregistre le token d'accés (par exemple lors du login/register) dans le 
     * local storage et redirige vers la route /profile.
     * @param token 
     */
    saveToken(token: string): void {
        localStorage.setItem(environment.accessToken, token);
        this.router.navigate(['/profile']);
    }

    /**
     * Retourne le token (accessToken) présent dans le local storage ou null si
     * aucun token sous ce nom n'est trouvé.
     * @returns 
     */
    getToken(): string | false {
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
    isLogged(): boolean {
        const token = localStorage.getItem(environment.accessToken);
        return !!token;
    }

    /**
     * Supprime le token sous le nom accessToken du local storage et redirige
     * vers la route /login.
     */
    clearToken(): void {
        localStorage.removeItem(environment.accessToken);
        this.router.navigate(['/login']);
    }
}
