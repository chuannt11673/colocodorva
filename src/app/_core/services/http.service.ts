import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpEndpoint } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    public endpoint = httpEndpoint;
    constructor(private http: HttpClient) {}

    get(url: string, options: any = null): Observable<any> {
        return this.http.get(`${this.endpoint}${url}`, options || {});
    }

    post(url: string, model: any): Observable<any> {
        return this.http.post(`${this.endpoint}${url}`, model, {});
    }

    put(url: string, model: any): Observable<any> {
        return this.http.put(`${this.endpoint}${url}`, model, {});
    }

    delete(url: string): Observable<any> {
        return this.http.delete(`${this.endpoint}${url}`, {});
    }
}