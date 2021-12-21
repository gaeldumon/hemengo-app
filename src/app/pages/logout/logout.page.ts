import { Component, OnInit } from '@angular/core';

import { TokenService } from 'src/app/services/token.service';


@Component({
    selector: 'app-logout',
    templateUrl: './logout.page.html',
    styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

    constructor(
        private tokenService: TokenService
    ) { }

    ngOnInit() {
        this.tokenService.clearToken();
    }

}
