import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { Injectable } from '@angular/core';



const TOKEN_HEADER= 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private login:LoginService)
    {
        
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    //add the jwt token  which is in localstorage so that request current-user can be acessed
    let authReq=request;
    const token= this . login.getToken();
    console.log("Inside Interceptor");
    if(token != null){
        authReq=authReq.clone({
            // [TOKEN_HEADER]: dynamically bind karibaku padiba nahale error asiba
            setHeaders: { [TOKEN_HEADER]: `Bearer ${token}`},

        });
    }
    return next.handle(authReq);


    }
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi: true,
    }
];