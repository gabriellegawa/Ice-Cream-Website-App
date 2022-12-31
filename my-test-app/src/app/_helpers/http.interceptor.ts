import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     req = req.clone({
    //     withCredentials: true,
    // });

    // return next.handle(req);
        const idToken = localStorage.getItem("id_token")
        
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + idToken)
            })

            return next.handle(cloned)
        }
        else {
            return next.handle(req)
        }
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];