import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    private appPages: object[];

    constructor() {
        this.appPages = [
            { title: "Demo", url: "/demo", icon: "cube" },
            { title: "Deconnexion", url: "/logout", icon: "exit" }
        ]
    }

    ngOnInit() { }

}
