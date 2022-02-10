import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';

import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { CityService } from 'src/app/services/city.service';
import { StatusService } from 'src/app/services/status.service';
import { VendingMachineService } from 'src/app/services/vending-machine.service';

import { IOrder } from 'src/app/interfaces/order';

import { environment } from 'src/environments/environment';
import { isToday } from 'src/app/helpers/util';
import { classicToast } from 'src/app/helpers/toaster';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private orders: IOrder[];
    private archiveOrders: IOrder[];
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
        this.archiveOrders = [];
        this.cardColor = { primary: "#d9b791", secondary: "#313c6e" }
    }

    ngOnInit(): void {
        this.setActiveOrders();
        this.setArchiveOrders();
    }

    /**
     * 
     * @returns 
     */
    private setActiveOrders() {
        this.orderService.getActiveByUserId(this.userService.payload.id).subscribe(res => {
            this.orders = res.orders;

            this.orders.forEach((order, i) => {
                this.orders[i].pickupToday = isToday(order.pickupDate);

                this.statusService.getById(order.StatusId).subscribe(res => {
                    this.orders[i].status = res.status;
                });

                this.orderService.getProducts(order.id).subscribe(res => {
                    this.orders[i].products = res.products;
                });

                this.vendingMachineService.getById(order.VendingMachineId).subscribe(res => {
                    this.orders[i].vendingMachine = res.machine;

                    this.cityService.getById(res.machine.CityId).subscribe(res => {
                        this.orders[i].city = res.city
                    });
                });
            });
        },
            err => {
                (environment.production) ? false : console.error(err.message);
            });
    }

    /**
     * 
     * @returns 
     */
    private setArchiveOrders() {
        this.orderService.getArchiveByUserId(this.userService.payload.id).subscribe(res => {
            this.archiveOrders = res.orders;

            this.archiveOrders.forEach((order, i) => {
                this.archiveOrders[i].pickupToday = isToday(order.pickupDate);

                this.statusService.getById(order.StatusId).subscribe(res => {
                    this.archiveOrders[i].status = res.status;
                });

                this.orderService.getProducts(order.id).subscribe(res => {
                    this.archiveOrders[i].products = res.products;
                });

                this.vendingMachineService.getById(order.VendingMachineId).subscribe(res => {
                    this.archiveOrders[i].vendingMachine = res.machine;

                    this.cityService.getById(res.machine.CityId).subscribe(res => {
                        this.archiveOrders[i].city = res.city
                    });
                });
            });
        },
            err => {
                (environment.production) ? false : console.error(err.message);
            });
    }

    /**
     * Lance l'action aprés un clic sur récupérer commande en fonction de la 
     * plateforme actuelle. TODO: toast a supprimer avant soutenance. Utilisé pour debugger.
     * @see La documentation de this.plateform.is().
     */
    private launchOrderPickupAction(order: IOrder) {
        if (this.platform.is('android')) {
            window.open('android-app://com.example.hemengoscanner', "_system");
            classicToast("Plateforme Android", "logo-android", "success");
        } else {
            this.router.navigate(['demo', 'order', order.id]);
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
}