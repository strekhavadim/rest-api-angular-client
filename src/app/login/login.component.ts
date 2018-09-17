import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormValidationService} from '../form-validation.service';
import {UserService} from '../user.service';
import {AuthenticationService} from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private userService: UserService,
                private authService: AuthenticationService,
                private formValidationService: FormValidationService,
                private router: Router) {
    }

    requestData = {
        username: '',
        password: '',
    };
    message = '';
    errorMessages = [];

    ngOnInit() {
    }

    login() {
        return this.authService.login(this.requestData).subscribe(result => {
                this.userService.getMe().subscribe(result => {
                    localStorage.setItem('userInfo', JSON.stringify(result));
                    this.router.navigate(['home']);
                });
            },
            error => {
                if (error.status === 422) {
                    this.errorMessages = this.formValidationService.getErrors(error.error.errors);
                } else {
                    this.errorMessages = [error.error.message];
                }
            });
    }

}
