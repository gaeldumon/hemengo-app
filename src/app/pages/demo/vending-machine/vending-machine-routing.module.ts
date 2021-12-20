import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendingMachinePage } from './vending-machine.page';

const routes: Routes = [
    {
        path: '',
        component: VendingMachinePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VendingMachinePageRoutingModule { }
