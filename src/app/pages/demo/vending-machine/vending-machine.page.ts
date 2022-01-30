import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/interfaces/order';
import { IVendingMachine } from 'src/app/interfaces/vendingMachine';
import { VendingMachineService } from 'src/app/services/vending-machine.service';

@Component({
    selector: 'app-vending-machine',
    templateUrl: './vending-machine.page.html',
    styleUrls: ['./vending-machine.page.scss'],
})
export class VendingMachinePage implements OnInit {
    private orderId: number;
    private vendingMachineId: number;
    private vendingMachine: IVendingMachine;
    private order: IOrder;
    private mockupGrid: string[][];

    constructor(
        private activatedRoute: ActivatedRoute,
        private vendingMachineService: VendingMachineService
    ) { }

    ngOnInit() {
        this.mockupGrid = [
            ["a1", "b1", "c1", "d1", "e1"],
            ["a2", "b2", "c2", "d2", "e2"],
            ["a3", "b3", "c3", "d3", "e3"],
            ["a4", "b4", "c4", "d4", "e4"],
            ["a5", "b5", "c5", "d5", "e5"],
            ["a6", "b6", "c6", "d6", "e6"]
        ];

        this.activatedRoute.paramMap.subscribe(params => {
            this.orderId = Number(params.get('orderId'));
            this.vendingMachineId = Number(params.get('vendingMachineId'));
        });

        console.log({
            orderId: this.orderId,
            vendingMachineId: this.vendingMachineId
        })
    }
}
