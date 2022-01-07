import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-vending-machine',
    templateUrl: './vending-machine.page.html',
    styleUrls: ['./vending-machine.page.scss'],
})
export class VendingMachinePage implements OnInit {
    private vendingMachine: object;

    constructor() { }

    ngOnInit() {
        this.vendingMachine = {
            uuid: "3edacac4-c31e-4edf-83f2-2a515c0577b7",
            grid: [
                [ "a1", "b1", "c1", "d1", "e1" ],
                [ "a2", "b2", "c2", "d2", "e2" ],
                [ "a3", "b3", "c3", "d3", "e3" ],
                [ "a4", "b4", "c4", "d4", "e4" ],
                [ "a5", "b5", "c5", "d5", "e5" ],
                [ "a6", "b6", "c6", "d6", "e6" ]
            ]
        }
    }
}
