import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() {
    }

    public getAccessToken(): Observable<string> {
        const token: string = <string>localStorage.getItem('access_token');
        return of(token);
    }

    public getRefreshToken(): Observable<string> {
        const token: string = <string>localStorage.getItem('refresh_token');
        return of(token);
    }

    public setAccessToken(token: string): TokenStorageService {
        localStorage.setItem('access_token', token);
        return this;
    }

    public setRefreshToken(token: string): TokenStorageService {
        localStorage.setItem('refresh_token', token);
        return this;
    }

    public clear() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}
