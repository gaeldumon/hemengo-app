import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private orders: any;

    constructor(private userService: UserService) {
        this.orders = [];
    }

    ngOnInit(): void {
        this.userService.getOrdersByUserId(this.userService.payload.id).subscribe(
            res => {
                this.orders = res.orders;

                this.orders.forEach((order, i) => {

                    this.userService.getOrderProductsByOrderId(order.id).subscribe(
                        res => this.orders[i].products = res.products
                    );

                    this.userService.getVendingMachineById(order.VendingMachineId).subscribe(
                        res => {
                            this.orders[i].vendingMachine = res.machine;

                            this.userService.getCityById(res.machine.CityId).subscribe(
                                res => this.orders[i].city = res.city
                            );
                        }
                    );
                })

                console.log(this.orders)
            },
            err => console.error(err.message)
        );
    }

    private getRandomColor(): string {
        let randR = Math.floor(Math.random() * (225 - 10)).toString();
        let randG = Math.floor(Math.random() * (225 - 10)).toString();
        let randB = Math.floor(Math.random() * (225 - 10)).toString();
        return "rgb(" + randR + "," + randG + "," + randB + ")";
    }
}