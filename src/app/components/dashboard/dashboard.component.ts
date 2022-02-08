import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    private appPages: object[];
    private user: IUser;

    constructor(private userService: UserService) {
        this.appPages = [
            { title: "Mon profil", url: "/profile", icon: "home" },
            { title: "Demo", url: "/demo", icon: "cube", disabled: true },
            { title: "Deconnexion", url: "/logout", icon: "exit" }
        ];

        this.user = {
            id: 0,
            email: "",
            password: "",
            username: "",
            firstname: "",
            lastname: "",
            address: "",
            verified: false
        };
    }

    ngOnInit() {
        this.userService.setUserPayload();

        this.userService.getOne(this.userService.payload.id).subscribe(
            res => this.user = res.user,
            err => console.error(err)
        );
    }

}
