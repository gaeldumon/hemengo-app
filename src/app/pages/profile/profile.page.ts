import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { IOrder } from 'src/app/interfaces/order';
import { CityService } from 'src/app/services/city.service';
import { OrderService } from 'src/app/services/order.service';
import { VendingMachineService } from 'src/app/services/vending-machine.service';
import { isToday } from 'src/app/helpers/util';
import { Platform } from '@ionic/angular';
import { toastController } from '@ionic/core'; //à supprimer, c'est juste pour les infos

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
        private platform:Platform
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
     * 
     * @param date 
     * @returns 
     */
    private formatDatetime(date: string): string {
        const d = new Date(date);
        const month = ((d.getMonth() + 1) < 9) ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        return `${d.getDate()}/${month}/${d.getFullYear()}`;
    }

    //fonction à supprimer quand on aura plus besoin du toast
    async toastSuccess(message: string, icon: string) {
        const toast = await toastController.create({
            color: 'success',
            duration: 2000,
            message: message,
            icon: icon
        });

        await toast.present();
    }

    callHemengoScan() {
        if (this.platform.is('android')) {
            this.toastSuccess("on est sur android", 'log-out-outline');//à supprimer
            window.open('android-app://com.example.hemengoscanner', "_system");//appelle l'appli hemengoScanner
        } else if (this.platform.is('desktop')) {
            this.toastSuccess('on est sur desktop', 'log-out-outline');//à supprimer
        } else {
            this.toastSuccess("on est ni sur android, ni sur desktop", 'log-out-outline')//à supprimer
        }
    }
}