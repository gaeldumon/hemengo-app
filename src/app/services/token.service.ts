import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private router: Router) {
        //...
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
        this.router.navigate(['/folder/Home']);
    }

    getToken(): string | null {
        const token = localStorage.getItem('token');
        if (!!token) {
            return token;
        } else {
            return null;
        }
    }

    isLogged(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    clearToken() {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
    }
}
