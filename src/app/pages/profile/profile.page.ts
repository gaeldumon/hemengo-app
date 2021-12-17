import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-folder',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    public profile: string;

    constructor(private activatedRoute: ActivatedRoute) {
        //...
    }

    ngOnInit() {
        this.profile = this.activatedRoute.snapshot.paramMap.get('id');
    }
}
