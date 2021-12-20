import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public appPages = [
        { title: 'Home', url: '/profile/Home', icon: 'home' },
        { title: 'Orders', url: '/profile/Orders', icon: 'bag' },
        { title: 'Favorites', url: '/profile/Favorites', icon: 'heart' },
        { title: 'Archived', url: '/profile/Archived', icon: 'archive' },
        { title: 'Demo', url: '/demo/distrib', icon: 'color-wand', flag: "warning" }
    ];

    constructor() { }
}
