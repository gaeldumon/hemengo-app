import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/interfaces/order';
import { IVendingMachine } from 'src/app/interfaces/vendingMachine';
import { VendingMachineService } from 'src/app/services/vending-machine.service';
import { Animation, AnimationController } from '@ionic/angular';

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
        private vendingMachineService: VendingMachineService,
        private animationController: AnimationController
    ) {
        // Assignation naive en attendant d'implementer un async pipe
        this.vendingMachine = {
            id: 0,
            uuid: "",
            ref: "",
            latitude: 0,
            longitude: 0,
            street: "",
            maxLineCapacity: 0,
            maxRowCapacity: 0,
            qrCode: "",
            CityId: 0
        };

        // Assignation naive en attendant d'implementer un async pipe
        this.order = {
            id: 0,
            price: 0,
            pickupDate: "",
            pickupToday: false,
            StatusId: 0,
            status: null,
            VendingMachineId: 0,
            vendingMachine: null,
            city: null,
            products: null
        }
    }

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

        this.vendingMachineService.getById(this.vendingMachineId).subscribe(
            res => {
                this.vendingMachine = res.machine;
                this.vendingMachine.qrCode = this.vendingMachineService
                    .getQrCodeSrc(this.vendingMachine.uuid);
            },
            err => console.log(err)
        );
    }

    ngAfterViewInit() {
        this.animateUnlocking();
    }

    /**
     * 
     */
    private animateUnlocking() {
        const cols = Array.from(document.getElementsByClassName("vending-machine-cols"));
        const orderLockers = ["A1", "A2", "D3", "E6"];
        const foundLockers = orderLockers.map(ref => cols.find(el => el.textContent === ref));
        const unlockAnim = this.animationController.create()
            .addElement(foundLockers)
            .fill('none')
            .duration(1000)
            .afterStyles({
                background: 'rgba(0, 255, 0, 0.5)'
            })
            .keyframes([
                { offset: 0, transform: 'scale(1) rotate(0)' },
                { offset: 0.5, transform: 'scale(1.2) rotate(0)' },
                { offset: 1, transform: 'scale(1) rotate(0)' }
            ]);

        unlockAnim.play();
    }
}
