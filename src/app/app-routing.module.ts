import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'profile/Home',
        pathMatch: 'full'
    },
    {
        path: 'profile/:id',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'auth/login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
