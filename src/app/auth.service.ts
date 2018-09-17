import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {environment} from '../environments/environment';
import {Observable, throwError} from 'rxjs';
import {AuthService} from 'ngx-auth';
import {catchError, map, tap, switchMap} from 'rxjs/operators';

interface AccessData {
    access_token: string;
    refresh_token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements AuthService {

    constructor(private http: HttpClient,
                private tokenStorage: TokenStorageService) {
    }

    public isAuthorized(): Observable<boolean> {
        return this.tokenStorage
            .getAccessToken().pipe(map(token => !!token));
    }

    public getAccessToken(): Observable<string> {
        return this.tokenStorage.getAccessToken();
    }

    public refreshToken(): Observable<any> {
        const service = environment.apiUrl + 'oauth/token/refresh';
        return this.tokenStorage
            .getRefreshToken().pipe(
                switchMap((refreshToken: string) => {
                    return this.http.post(service, {refreshToken});
                }),
                tap(this.saveAccessData.bind(this)),
                catchError((err) => {
                    this.logout();
                    return throwError(err);
                })
            );
    }

    public refreshShouldHappen(response: HttpErrorResponse): boolean {
        return false;
    }

    public verifyTokenRequest(url: string): boolean {
        return url.endsWith('/refresh');
    }

    public login(loginData) {
        const url = environment.apiUrl + 'oauth/token';

        let loginFormData = loginData;
        loginFormData.client_secret = environment.clientSecret;
        loginFormData.grant_type = environment.grantType;
        loginFormData.client_id = environment.clientId;

        return this.http.post(url, loginFormData).pipe(
            tap((tokens: AccessData) => this.saveAccessData(tokens)),
            catchError(e => throwError(e))
        );
    }

    public logout(): void {
        this.tokenStorage.clear();
        location.reload(true);
    }

    private saveAccessData({access_token, refresh_token}: AccessData) {
        this.tokenStorage
            .setAccessToken(access_token)
            .setRefreshToken(refresh_token);
    }

}
