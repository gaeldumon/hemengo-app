import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICredential } from 'src/app/interfaces/credential';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    errorStatus: number;

    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private router: Router
    ) { }

    ngOnInit(): void { }

    login(creds: ICredential): void {
        this.authService.login(creds).subscribe(
            data => this.tokenService.saveToken(data.accessToken),
            err => this.errorStatus = err.status
        );
    }

    getErrorMsg(): string {
        if (this.errorStatus >= 400 && this.errorStatus < 500) {
            return "Connexion non autorisé avec ces identifiants";
        } else if (this.errorStatus < 400 || this.errorStatus >= 500) {
            return "Echec connexion";
        }
    }
}
