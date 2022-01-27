import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/helpers/utils';
import { environment } from 'src/environments/environment';
import { IOrder } from 'src/app/interfaces/order';
import { CityService } from 'src/app/services/city.service';
import { OrderService } from 'src/app/services/order.service';
import { VendingMachineService } from 'src/app/services/vending-machine.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private orders: IOrder[];
    private randomColors: string[];

    constructor(
        private cityService: CityService,
        private orderService: OrderService,
        private userService: UserService,
        private vendingMachineService: VendingMachineService
    ) {
        this.orders = [];
        this.randomColors = [];
    }

    ngOnInit(): void {
        this.orderService.getByUserId(this.userService.payload.id).subscribe(
            res => {
                this.orders = res.orders;
                this.randomColors = Utils.getRandomColors(this.orders.length);
                this.orders.forEach((order, i) => {
                    this.orders[i].pickupDate = Utils.formatDatetime(order.pickupDate);

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
                })
            },
            err => (!environment.production) ? console.error(err.message) : false
        );
    }
}