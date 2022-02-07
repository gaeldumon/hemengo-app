import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { IOrder } from 'src/app/interfaces/order';
import { CityService } from 'src/app/services/city.service';
import { OrderService } from 'src/app/services/order.service';
import { VendingMachineService } from 'src/app/services/vending-machine.service';
import { StatusService } from 'src/app/services/status.service';
import { isToday } from 'src/app/helpers/util';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// TODO : A supprimer avant soutenance. Utilisé pour debugger.
import { toastController } from '@ionic/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private orders: IOrder[];
    private historicOrders: IOrder[];
    private cardColor: object;

    constructor(
        private cityService: CityService,
        private orderService: OrderService,
        private userService: UserService,
        private vendingMachineService: VendingMachineService,
        private platform: Platform,
        private statusService: StatusService,
        private router: Router
    ) {
        this.orders = [];
        this.historicOrders = [];
        this.cardColor = { primary: "#d9b791", secondary: "#313c6e" }
    }

    ngOnInit(): void {
        this.setActiveOrders().then(() => console.log("active orders ok"));
        this.setArchiveOrders().then(() => console.log("archive orders ok"));
    }

    /**
     * 
     * @returns 
     */
    async setActiveOrders() {
        return this.orderService.getActiveByUserId(this.userService.payload.id).subscribe(
            res => {
                this.orders = res.orders;

                this.orders.forEach((order, i) => {
                    this.orders[i].pickupToday = isToday(order.pickupDate);

                    this.statusService.getById(order.StatusId)
                        .subscribe(res => this.orders[i].status = res.status);

                    this.orderService.getProducts(order.id)
                        .subscribe(res => this.orders[i].products = res.products);

                    this.vendingMachineService.getById(order.VendingMachineId)
                        .subscribe(
                            res => {
                                this.orders[i].vendingMachine = res.machine;
                                this.cityService.getById(res.machine.CityId)
                                    .subscribe(res => this.orders[i].city = res.city);
                            }
                        );
                });
            },
            err => (environment.production) ? false : console.error(err.message)
        );
    }

    /**
     * 
     * @returns 
     */
    async setArchiveOrders() {
        return this.orderService.getArchiveByUserId(this.userService.payload.id).subscribe(
            res => {
                this.historicOrders = res.orders;

                this.historicOrders.forEach((order, i) => {
                    this.statusService.getById(order.StatusId)
                        .subscribe(res => this.historicOrders[i].status = res.status);

                    this.orderService.getProducts(order.id)
                        .subscribe(res => this.historicOrders[i].products = res.products);

                    this.vendingMachineService.getById(order.VendingMachineId)
                        .subscribe(
                            res => {
                                this.historicOrders[i].vendingMachine = res.machine;
                                this.cityService.getById(res.machine.CityId)
                                    .subscribe(res => this.historicOrders[i].city = res.city);
                            }
                        );
                });
            },
            err => (environment.production) ? false : console.error(err.message)
        );
    }

    /**
     * Navigue vers la page /demo, en passant l'id de la commande et l'id du
     * distributeur de la commande en paramètre à la route.
     * @param order 
     */
    private gotoDemo(order: IOrder): void {
        this.router.navigate(['demo', 'order', order.id]);
    }

    /**
     * Lance l'action aprés un clic sur récupérer commande en fonction de la 
     * plateforme actuelle. Il s'avère que sur un browser desktop les plateformes
     * sont : "mobile", "mobileweb" et "tablet" (et non desktop attention).
     * @see La documentation de this.plateform.is().
     * TODO : Toasts a supprimer avant soutenance. Utilisé pour debugger.
     */
    private launchOrderPickupAction(order: IOrder) {
        if (this.platform.is('android')) {

            // Lancement HemengoScanner
            window.open('android-app://com.example.hemengoscanner', "_system");
            this.toastSuccess("ON_ANDROID", 'log-out-outline');

        } else if (this.platform.is('mobileweb')) {

            this.gotoDemo(order);
            this.toastSuccess('ON_MOBILEWEB', 'log-out-outline');

        } else {
            this.toastSuccess("NOT_ANDROID_OR_MOBILEWEB", 'log-out-outline');
        }
    }

    /**
     * Retourne une date au format jour/mois/année.
     * @param date 
     * @returns 
     */
    private formatDatetime(date: string): string {
        const d = new Date(date);
        const month = ((d.getMonth() + 1) < 9) ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        return `${d.getDate()}/${month}/${d.getFullYear()}`;
    }

    /**
     * TODO : A supprimer avant soutenance. Utilisé pour debugger.
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
}