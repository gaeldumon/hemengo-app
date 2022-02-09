import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';

import { AppRoutingModule } from './app-routing.module';

import { TokenInterceptorProvider } from './helpers/token.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LayoutComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        TokenInterceptorProvider
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule { }
