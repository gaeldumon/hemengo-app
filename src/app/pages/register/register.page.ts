import { Component, OnInit } from '@angular/core';

import { ICredential } from 'src/app/interfaces/credential';

import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    private errorStatus: number;

    constructor(
        private authService: AuthService,
        private tokenService: TokenService
    ) { }

    ngOnInit(): void { }

    register(creds: ICredential): void {
        this.authService.register(creds).subscribe(
            data => this.tokenService.saveToken(data[environment.accessToken]),
            err => this.errorStatus = err.status
        );
    }

    getErrorMsg(): string {
        if (this.errorStatus) {
            return "Identifiants non valides"
        }
    }
}
