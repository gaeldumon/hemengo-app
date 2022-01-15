import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.page.html',
    styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
    private mainImage: string;

    constructor() {
        this.mainImage = `${environment.endpoint.upload}/visual/page_not_found.gif`;
    }

    ngOnInit() { }
}
