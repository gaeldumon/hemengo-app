import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendingMachinePageRoutingModule } from './vending-machine-routing.module';

import { VendingMachinePage } from './vending-machine.page';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VendingMachinePageRoutingModule
    ],
    declarations: [VendingMachinePage]
})
export class VendingMachinePageModule { }
