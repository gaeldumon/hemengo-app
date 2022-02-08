import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnimationController } from '@ionic/angular';
import { loadingController } from '@ionic/core';

import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { VendingMachineService } from 'src/app/services/vending-machine.service';

import { IOrder } from 'src/app/interfaces/order';
import { IVendingMachine } from 'src/app/interfaces/vendingMachine';

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
     * Tableau permettant de faire concorder reference des casiers et produits
     * dans chaque casiers. Tableau d'objets ILocker (à créer) et IProduct !
     */
    private productRefAssoc;

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

        // Il faudrait plutôt créer une grille à partir de this.productRefAssoc
        // comme ça au besoin on pourrait même écrire le nom du produit sur chaque
        // casiers.
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

        this.orderService.getById(this.orderId).subscribe(res => {
            // La commande actuelle que l'utilisateur vient récupérer
            this.order = res.order;
            // A cette commande on y accroche les produits
            this.orderService.getProducts(this.order.id).subscribe(res => {
                this.order.products = res.products
            });

            // On va chercher le distributeur associé à cette commande
            this.machineService.getById(this.order.VendingMachineId).subscribe(res => {
                // Le distributeur associé a cette commande
                this.machine = res.machine;
                // Le QR Code de ce distributeur
                this.machine.qrCode = this.machineService.getQrCodeSrc(this.machine.uuid);
                // On va chercher tous les casiers de ce distributeur
                this.machineService.getLockers(this.machine.id).subscribe(res => {
                    // Pour chaque casier on va chercher le produit associé
                    res.lockers.forEach(locker => {
                        this.productService.getById(locker.ProductId).subscribe(
                            res => this.productRefAssoc.push({
                                locker, product: res.product
                            })
                        );
                    });

                    // Id des produits de la commande, afin de récupérer ceux
                    // ci dans les casiers (savoir quels casiers deverouiller).
                    const orderProductsIds = this.order.products.map(p => p.id);
                    // Filtre le grand tableau des correspondances refsCasiers-produits
                    // pour n'avoir que ceux impactés par la commande.
                    const filtAssoc = this.productRefAssoc.filter(a => orderProductsIds.includes(a.product.ProductId));
                    // Refs des casiers à deverouiller. Permet de les trouver dans
                    // le dom. A passer à l'animation.
                    const refsToUnlock = filtAssoc.map(a => a.locker.MatrixElementRef);
                    // Mais vide, car productRefAssoc semble être assimilé comme vide
                    // alors qu'il ne l'est pas...
                    console.log(refsToUnlock);
                    // Montré non vide, mais .length === 0 !!??
                    console.log(this.productRefAssoc);
                });
            });
        });
    }

    /**
     * 
     * @returns 
     */
    private async findLockersToUnlock(): Promise<Element[]> {
        // La grille des casiers physiquement dans le dom
        const cols = Array.from(document.getElementsByClassName("vending-machine-cols"));
        // Mockup des casiers de la commande (cf. sub getLockers() pour les vrais)
        const refsToUnlock = ["B6", "A4", "A6", "C6"];
        // Ces casiers trouvés dans le dom
        const foundLockers = refsToUnlock.map(ref => cols.find(el => el.textContent === ref));

        return foundLockers;
    }

    /**
     * Lance l'animation d'ouverture des casiers de la commande.
     */
    private async launchUnlocking() {
        // On prepare un spin-loader de 3s
        const loading = await loadingController.create({
            spinner: "bubbles",
            message: 'Vérification...',
            duration: 2000,
            backdropDismiss: true
        });

        // On le lance
        await loading.present();

        // On cherchent et on trouvent les casiers à deverouiller
        const lockersToUnlock = await this.findLockersToUnlock();

        // Une fois qu'on les a on attend que le loader se termine
        await loading.onDidDismiss();

        // Une fois terminé on peut lancer l'animation
        await this.animateUnlocking(lockersToUnlock);

        // Passer la commande en statut "retrieved" (id 4)
        // this.orderService.isRetrieved(this.order.id).subscribe(res => {
        //      Afficher toast message de succés et rediriger vers profile
        // })
    }

    /**
     * 
     * @param lockersToUnlock 
     */
    private async animateUnlocking(lockersToUnlock: Element[]): Promise<void> {
        const unlockAnim = this.animationController.create()
            .addElement(lockersToUnlock)
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

        return unlockAnim.play();
    }

    /**
     * Retourne un tableau 2D a partir d'un tableau 1D.
     * @param refs 
     * @returns 
     */
    private makeGrid(refs: string[]): string[][] {
        const grid = [];
        while (refs.length) grid.push(refs.splice(0, 6));
        return grid;
    }
}
