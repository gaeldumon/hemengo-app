import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user = {
        email: "",
        password: ""
    }

    constructor(
        private authService: AuthService,
        private tokenService: TokenService
    ) {
        //...
    }

    ngOnInit(): void {
        //...
    }

    onSubmit(): void {
        console.log(this.user);
        this.authService.login(this.user).subscribe(
            data => this.tokenService.saveToken(data.accessToken),
            err => console.error("onSubmit AuthService error", err)
        );
    }

}
