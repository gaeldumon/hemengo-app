import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-splash',
    templateUrl: './splash.page.html',
    styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
    private logo: string;

    constructor() {
        this.logo = `${environment.endpoint.upload}/logo/hemengo_logo.png`;
    }

    ngOnInit() { }
}
