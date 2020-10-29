import { Injectable } from '@angular/core';
import { UserManager } from 'oidc-client';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { userManagerSettings } from 'src/environments/environment';
import { HttpService } from './http.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpService,
                private cookieService: CookieService) {
        this.userManage = new UserManager(userManagerSettings);
    }
    userManage: UserManager;

    private tokenEndpoint = '/connect/token';

    getUser() {
        return from(this.userManage.getUser()).pipe(map(user => {
            this.setToken(user.access_token);
        }));
    }

    login(username: string, password: string) {
        const formData = new FormData();
        formData.append('client_id', 'spa');
        formData.append('grant_type', 'password');
        formData.append('scope', 'openid profile WebAppAPI');
        formData.append('username', username);
        formData.append('password', password);
        return this.http.post(this.tokenEndpoint, formData).pipe(map((res: any) => {
            this.setToken(res.access_token);
            return true;
        }));
    }

    authorize(provider?: string) {
        this.cookieService.set('provider', provider);
        const request = this.userManage.signinPopup();
        return from(request).pipe(map(user => {
            this.setToken(user.access_token);
        }));
    }

    authorizeHandler() {
        const handler = this.userManage.signinPopupCallback();
        return from(handler);
    }

    private setToken(token: string) {
        sessionStorage.setItem('access_token', token);
    }
}
