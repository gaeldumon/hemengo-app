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

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {

        const token = this.tokenService.getToken();

        if (!token) {
            return next.handle(request).pipe(
                catchError(error => {
                    if (error.error instanceof ErrorEvent) {
                        return throwError({
                            msg: `Client Error: ${error.error.message}`
                        });
                    } else {
                        return throwError({
                            status: error.status,
                            msg: `Server error: ${error.message}`
                        });
                    }
                })
            );
        }

        const clone = request.clone({
            headers: request.headers.set('Authorization', 'bearer ' + token)
        });

        return next.handle(clone);
    }
}

export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
}