import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { toastController } from '@ionic/core';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.page.html',
    styleUrls: ['./logout.page.scss'],
})

export class LogoutPage implements OnInit {

    constructor(
        private tokenService: TokenService,
    ) { }

    /**
     * 
     * @param message 
     * @param icon 
     */
    async toastSuccess(message: string, icon: string) {
        const toast = await toastController.create({
            color: 'success',
            duration: 2000,
            message: message,
            icon: icon
        });

        await toast.present();
    }

    ngOnInit() {
        this.tokenService.clearToken();
        this.toastSuccess("Déconnexion réussie", 'log-out-outline');
    }

}