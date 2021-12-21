import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module')
            .then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module')
            .then(m => m.RegisterPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module')
            .then(m => m.ProfilePageModule), canActivate: [AuthGuard]
    },
    {
        path: 'demo',
        loadChildren: () => import('./pages/demo/vending-machine/vending-machine.module')
            .then(m => m.VendingMachinePageModule), canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module')
            .then(m => m.ProfilePageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
