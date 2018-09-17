import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {map} from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        const url = environment.apiUrl + 'api/users';
        return this.http.get<User[]>(url);
    }

    getUser(id: number): Observable<User> {
        const url = environment.apiUrl + 'api/users/' + id;
        let currentUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        return this.http.get<User>(url).pipe(
            map(user => {
                if (user.likes && user.likes.length) {
                    if(currentUserInfo && currentUserInfo.id){
                        let likedByCurrentUser = user.likes.filter((item) => {
                            return item.user_id === currentUserInfo.id;
                        });
                        if(likedByCurrentUser.length){
                            user['liked'] = true;
                        }
                    }
                }
                return user;
            })
        );
    }

    getMe(): Observable<User> {
        const url = environment.apiUrl + 'api/users/me';
        return this.http.get<User>(url);
    }

    likeUser(id: number) {
        const url = environment.apiUrl + 'api/users/' + id + '/like';
        return this.http.post(url, {});
    }

    updateMe(requestData) {
        const url = environment.apiUrl + 'api/users/me';
        return this.http.put(url, requestData);
    }

    updateMyProfileImage(requestData) {
        const url = environment.apiUrl + '/api/users/me/profileimage';
        return this.http.patch(url, requestData).pipe(
            map(result => result[0])
        );
    }
}
