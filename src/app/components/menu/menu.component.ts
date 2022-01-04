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
        this.user = {
            id: 0,
            email: '',
            password: '',
            username: '',
            firstname: '',
            lastname: '',
            adress: '',
            verified: false
        };
    }

    ngOnInit(): void {
        this.userService.setUserPayload();

        this.userService.getOneUser(this.userService.payload.id).subscribe(
            res => {
                this.user = res.user;
            },
            err => {
                console.log(err);
            }
        );
    }

}
