import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.page.html',
    styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
    private mainImage: string;

    constructor() {
        this.mainImage = "assets/visuals/page_not_found.gif";
    }

    ngOnInit() { }
}
