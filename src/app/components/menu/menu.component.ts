import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    private appPages: object[];
    private user: IUser;

    constructor(private userService: UserService) {
        this.appPages = [
            { title: "Mon profil", url: "/profile", icon: "home" },
            { title: "Demo", url: "/demo", icon: "cube" },
            { title: "Deconnexion", url: "/logout", icon: "exit" }
        ]
    }

    ngOnInit(): void {
        this.userService.setUserPayload();

        this.userService.getOneUser(this.userService.payload.id).subscribe(
            res => {
                this.user = res.data;
            },
            err => {
                console.log(err);
            }
        );
    }

    getUsernameByEmailSplit(): string {
        return this.user.email.split("@")[0];
    }
}
