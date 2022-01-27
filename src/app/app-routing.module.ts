import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { UserGuard } from './helpers/user.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'splash',
        pathMatch: 'full'
    },
    {
        path: '', component: LayoutComponent, children: [
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
        ]
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
        path: 'logout',
        loadChildren: () => import('./pages/logout/logout.module')
            .then(m => m.LogoutPageModule), canActivate: [AuthGuard]
    },
    {
        path: 'splash',
        loadChildren: () => import('./pages/splash/splash.module')
            .then(m => m.SplashPageModule), canActivate: [UserGuard]
    },
    {
        path: '**',
        loadChildren: () => import('./pages/not-found/not-found.module')
            .then(m => m.NotFoundPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
