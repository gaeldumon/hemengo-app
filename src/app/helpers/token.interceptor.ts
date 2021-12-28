import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpEventType,
    HttpErrorResponse,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../services/token.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log("là on est dans l'intercepteur, requête originale ci-dessous"); //à supprimer
        console.log(request); // à supprimer
        let token = this.tokenService.getToken();

        if (token !== null) {
            let clone = request.clone({
                headers: request.headers.set('Authorization', 'bearer ' + token)
            });
            console.log("requête modifiée ci-dessous") //à supprimer
            console.log(clone); // à supprimer
            return next.handle(clone);
        } else {
            return next.handle(request).pipe(
                catchError(error => {
                    console.log(error);

                    let message = "";

                    if (error.error instanceof ErrorEvent) {
                        message = `Client Error : ${error.error.message}`;
                    } else {
                        message = `Server Error : ${error.status}\nMessage: ${error.message}`;
                    }

                    console.log(message);

                    return throwError(message);
                })
            );
        }
    }
}

export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
}