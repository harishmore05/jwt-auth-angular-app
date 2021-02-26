import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router,
    ) {}

    private handleUnauthorized(err: HttpErrorResponse): Observable<any> {
        if(err.status === 401 || err.status == 403) {
            this.router.navigateByUrl('signin');
            return of(err.message);
        }
        return throwError(err)
    }
    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });

        return next.handle(req).pipe(catchError(x => this.handleUnauthorized(x)));
    }
}