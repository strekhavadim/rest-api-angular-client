import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) {
    }

    register(requestData) {
        const url = environment.apiUrl + 'api/register';
        return this.http.post(url, requestData);
    }

}
