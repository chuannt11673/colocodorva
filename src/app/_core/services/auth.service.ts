import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { clientSetting } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public nav: NavController) {
        this.manager = new UserManager(this.clientSetting);
    }
    private manager: UserManager;
    private user: User;
    private clientSetting = clientSetting;

    initUser() {
        const callback = this.manager.getUser();
        return from(callback).pipe(map(user => {
            this.user = user;
            return user;
        }));
    }

    isLoggedIn(): boolean {
        return this.user != null && !this.user.expired;
    }

    startAuthentication(): Observable<any> {
        let signIn = this.manager.signinPopup();
        return from(signIn).pipe(map(res => {
            this.user = res;
            this.nav.navigateRoot('tabs');
            return res;
        }));
    }

    completeAuthentication(): Observable<User> {
        const callback = this.manager.signinPopupCallback();
        return from(callback);
    }

    signOut() {
        const callback = this.manager.signoutPopup();
        return from(callback);
    }

    completeSignOut() {
        const callback = this.manager.signoutPopupCallback();
        return from(callback);
    }
}