import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {FormValidationService} from '../form-validation.service';
import {User} from '../user';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(private userService: UserService,
                private formValidationService: FormValidationService,
                private router: Router) {
    }

    currentUser: User;

    requestData = {
        name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };
    formData = {
        profile_image: {},
        current_image: 'https://via.placeholder.com/200x200',
    };
    message = '';
    errorMessages = [];

    ngOnInit() {
        this.getCurrentUser();
    }

    getCurrentUser() {
        this.userService.getMe().subscribe(user => {
            this.currentUser = user;
            localStorage.setItem('userInfo', JSON.stringify(user));
            if (Object.keys(this.currentUser).length && this.currentUser.constructor === Object) {
                for (let key in this.requestData) {
                    if (this.currentUser.hasOwnProperty(key)) {
                        this.requestData[key] = this.currentUser[key];
                    }
                }
                if (this.currentUser.profile_image) {
                    this.formData.current_image = this.currentUser.profile_image;
                }
            }
        });
    }

    update() {
        this.message = '';
        this.userService.updateMe(this.requestData).subscribe(result => {
                localStorage.setItem('userInfo', JSON.stringify(result));
                this.errorMessages = [];
                this.requestData.password = '';
                this.requestData.password_confirmation = '';
                this.message = 'Successfully updated!';
            },
            error => {
                if (error.status === 422) {
                    this.errorMessages = this.formValidationService.getErrors(error.error.errors);
                } else {
                    this.errorMessages = [error.error.message];
                }
            });
    }

    onFileChanged(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.formData.profile_image = {
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                };
            };
        }
    }

    updateProfileImage() {
        this.message = '';
        this.userService.updateMyProfileImage({profile_image: this.formData.profile_image}).subscribe((result: string) => {
                let currentUserInfo = JSON.parse(localStorage.getItem('userInfo'));
                currentUserInfo['profile_image'] = result;
                localStorage.setItem('userInfo', JSON.stringify(currentUserInfo));
                this.errorMessages = [];
                this.formData.profile_image = {};
                this.formData.current_image = result;
                this.message = 'Profile image successfully updated!';
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
