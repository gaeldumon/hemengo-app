import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user = {
        email: "arthur@mail.fr",
        password: "gaga1989"
    }

    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log(this.user);

        this.authService.login(this.user).subscribe(
            data => this.tokenService.saveToken(data.accessToken),
            err => console.error("ngOnInit AuthService error", err)
        );
    }

    onSubmit(): void {
        this.authService.login(this.user).subscribe(
            data => this.tokenService.saveToken(data.accessToken),
            err => console.error("onSubmit AuthService error", err)
        );
    }
}
