import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private user: IUser;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.setUserPayload();

        this.userService.getOneUser(this.userService.payload.id).subscribe(
            res => {
                this.user = res.data;
            },
            err => console.log(err)
        )
    }
}
