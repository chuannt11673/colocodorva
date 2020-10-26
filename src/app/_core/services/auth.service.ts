import { Injectable } from '@angular/core';
import { UserManager } from 'oidc-client';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { httpEndpoint } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpService) {
        this.userManage = new UserManager({
            authority: httpEndpoint,
            client_id: 'spa',
            scope: 'openid profile WebAppAPI',
            response_type: 'code',
            popup_redirect_uri: window.location.origin + '/auth-callback',
            popup_post_logout_redirect_uri: window.location.origin
        });
    }
    userManage: UserManager;

    private tokenEndpoint = '/connect/token';

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

    authorize() {
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
