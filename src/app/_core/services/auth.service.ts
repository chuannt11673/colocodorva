import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpService) {
    }
    private tokenEndpoint = '/connect/token';

    login(username: string, password: string) {
        const formData = new FormData();
        formData.append('client_id', 'spa');
        formData.append('grant_type', 'password');
        formData.append('scope', 'openid profile WebAppAPI');
        formData.append('username', username);
        formData.append('password', password);
        return this.http.post(this.tokenEndpoint, formData).pipe(map((res: any) => {
            sessionStorage.setItem('access_token', res.access_token);
            return true;
        }));
    }
}
