import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogoutService} from '../logout.service';
import {AuthenticationService} from '../auth.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private logoutService: LogoutService,
                private authService: AuthenticationService,
                private router: Router) {
    }

    requestData = {
        username: '',
        password: '',
    };
    message = '';
    errorMessages = [];

    ngOnInit() {
        this.logoutService.logout().subscribe(
            res => {
                localStorage.removeItem('userInfo');
                this.authService.logout();
            }
        );
    }

}
