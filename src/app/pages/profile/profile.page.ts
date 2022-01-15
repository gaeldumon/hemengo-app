import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private orders: object[];

    constructor(private userService: UserService) {
        this.orders = [];
    }

    ngOnInit(): void {
        this.userService.getOrders(this.userService.payload.id).subscribe(
            res => { this.orders = res.orders },
            err => console.error(err.message)
        );
    }

    private getRandomColor(): string {
        let randR = Math.floor(Math.random() * (225 - 10)).toString();
        let randG = Math.floor(Math.random() * (225 - 10)).toString();
        let randB = Math.floor(Math.random() * (225 - 10)).toString();
        return "rgb(" + randR + "," + randG + "," + randB + ")";
    }
}