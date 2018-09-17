import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../register.service';
import {Router} from '@angular/router';
import {FormValidationService} from '../form-validation.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private registerService: RegisterService,
                private formValidationService: FormValidationService,
                private router: Router) {
    }

    requestData = {
        name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };
    message = '';
    errorMessages = [];

    ngOnInit() {
    }

    register() {
        this.registerService.register(this.requestData).subscribe(result => {
                this.router.navigate(['login']);
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
