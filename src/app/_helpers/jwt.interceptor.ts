import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../modules/auth";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const isPublicAPI = request.url.includes('publicApi');
    let token = this.authenticationService.token
      ? this.authenticationService.token
      : localStorage.getItem("token");
    if (token && !isPublicAPI) {
      request = request.clone({
        setHeaders: {
          'X-AUTH-TOKEN': token,
        },
      });
    }

    if (isPublicAPI)
      request = request.clone({
        url: request.url.replace('/publicApi', ''),
      });
    return next.handle(request);
  }
}
