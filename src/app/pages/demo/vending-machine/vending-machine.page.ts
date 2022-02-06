import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/interfaces/order';
import { IVendingMachine } from 'src/app/interfaces/vendingMachine';
import { VendingMachineService } from 'src/app/services/vending-machine.service';
import { Animation, AnimationController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-vending-machine',
    templateUrl: './vending-machine.page.html',
    styleUrls: ['./vending-machine.page.scss'],
})
export class VendingMachinePage implements OnInit {
    /**
     * L'id de la commande, envoyé lors du routage depuis /profile.
     */
    private orderId: number;
    /**
     * La commande en train d'être récupérée.
     */
    private order: IOrder;
    /**
     * Le distributeur de la commande.
     */
    private machine: IVendingMachine;
    /**
     * Grille tableau 2D permettant de representer un distributeur graphiquement.
     */
    private grid: string[][];
    /**
     * Tableau permettant de faire concorder reference des casiers et produits.
     */
    private productRefAssoc: object[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private machineService: VendingMachineService,
        private orderService: OrderService,
        private productService: ProductService,
        private animationController: AnimationController
    ) {
        // Assignation naive en attendant d'implementer un async pipe
        this.machine = {
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

        this.grid = [
            ["a1", "a2", "a3", "a4", "a5", "a6"],
            ["b1", "b2", "b3", "b4", "b5", "b6"],
            ["c1", "c2", "c3", "c4", "c5", "c6"],
            ["d1", "d2", "d3", "d4", "d5", "d6"],
            ["e1", "e2", "e3", "e4", "e5", "e6"]
        ];

        this.productRefAssoc = [];
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.orderId = Number(params.get('orderId'));
        });

        this.orderService.getById(this.orderId).subscribe(
            res => {
                // La commande actuelle que l'utilisateur vient récupérer
                this.order = res.order;
                // A cette commande on y accroche les produits
                this.orderService.getProducts(this.order.id).subscribe(
                    res => this.order.products = res.products
                );

                // On va chercher le distributeur associé à cette commande
                this.machineService.getById(this.order.VendingMachineId).subscribe(
                    res => {
                        // Le distributeur associé a cette commande
                        this.machine = res.machine;
                        // Le QR Code de ce distributeur
                        this.machine.qrCode = this.machineService.getQrCodeSrc(this.machine.uuid);
                        // On va chercher tous les casiers de ce distributeur
                        this.machineService.getLockers(this.machine.id).subscribe(
                            res => {
                                // Pour chaque casier on va chercher le produit associé
                                res.lockers.forEach(locker => {
                                    this.productService.getById(locker.ProductId).subscribe(
                                        res => this.productRefAssoc.push({
                                            locker, product: res.product
                                        })
                                    );
                                });
                            },
                            err => console.log(err)
                        );
                    },
                    err => console.log(err)
                );
            }
        );
    }

    ngAfterViewInit() {
        this.animateUnlocking();
    }

    /**
     * 
     * @param refs 
     * @returns 
     */
    private makeGrid(refs: string[]): string[][] {
        const grid = [];
        while (refs.length) grid.push(refs.splice(0, 6));
        return grid;
    }

    /**
     * Lance l'animation d'ouverture des casiers de la commande.
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
