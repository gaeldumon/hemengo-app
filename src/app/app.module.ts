import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptorProvider } from './helpers/token.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent
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
