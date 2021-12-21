import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './helpers/auth.guard';
import { UserGuard } from './helpers/user.guard';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module')
            .then(m => m.LoginPageModule), canActivate: [UserGuard]
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module')
            .then(m => m.RegisterPageModule), canActivate: [UserGuard]
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
        path: 'logout',
        loadChildren: () => import('./pages/logout/logout.module')
            .then(m => m.LogoutPageModule), canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
