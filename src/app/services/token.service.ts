import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private TOKEN_FIELD_NAME = "token";

    constructor(private router: Router) { }

    /**
     * Enregistre le token d'accés (par exemple lors du login/register) dans le 
     * local storage et redirige vers la route /profile.
     * @param token 
     */
    saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_FIELD_NAME, token);
        this.router.navigate(['/profile']);
    }

    /**
     * Retourne le token (accessToken) présent dans le local storage ou null si
     * aucun token sous ce nom n'est trouvé.
     * @returns 
     */
    getToken(): string | null {
        const token = localStorage.getItem(this.TOKEN_FIELD_NAME);

        if (!!token) {
            return token;
        } else {
            return null;
        }
    }

    /**
     * Retourne true si un token sous le nom accessToken est trouvé dans le 
     * local storage, false autrement.
     * @returns 
     */
    isLogged(): boolean {
        const token = localStorage.getItem(this.TOKEN_FIELD_NAME);
        return !!token;
    }

    /**
     * Supprime le token sous le nom accessToken du local storage et redirige
     * vers la route /login.
     */
    clearToken(): void {
        localStorage.removeItem(this.TOKEN_FIELD_NAME);
        this.router.navigate(['/login']);
    }
}
