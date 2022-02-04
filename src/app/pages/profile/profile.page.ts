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
// TODO : Delete before presentation. Only used for debugging.
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
        private statusService: StatusService
    ) {
        this.orders = [];
        this.historicOrders = [];
        this.cardColor = {
            primary: "#d9b791",
            secondary: "#313c6e"
        }
    }

    ngOnInit(): void {
        this.orderService.getActiveByUserId(this.userService.payload.id).subscribe(
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


        this.orderService.getArchiveByUserId(this.userService.payload.id).subscribe(
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
     * Ouvre l'application (la main_activity ?) HemengoScanner lorsque nous
     * sommes sur Android.
     */
    private callHemengoScan() {
        if (this.platform.is('android')) {
            this.toastSuccess("ON_ANDROID", 'log-out-outline');
            window.open('android-app://com.example.hemengoscanner', "_system");
        } else if (this.platform.is('desktop')) {
            this.toastSuccess('ON_DESKTOP', 'log-out-outline');
        } else {
            this.toastSuccess("NOT_ANDROID_OR_DESKTOP", 'log-out-outline');
        }
    }

    /**
     * TODO : Delete before presentation. Only used for debugging.
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