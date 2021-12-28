import { Component, OnInit } from '@angular/core';
import { ICredentialComplete } from 'src/app/interfaces/credential';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    user: ICredentialComplete

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.getUserDetails();
        console.log("l'id : " + this.userService.payload.id) // à supprimer
        this.userService.getOneUser(this.userService.payload.id).subscribe(
            data => {
                console.table(data)
                this.user = data.user
            },
            err => console.log(err)
        )
    }
}
