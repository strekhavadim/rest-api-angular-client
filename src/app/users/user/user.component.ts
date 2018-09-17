import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../user.service';
import {Location} from '@angular/common';
import {User} from '../../user';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @Input() user: User;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private location: Location) {
    }

    ngOnInit() {
        this.getUser();
    }

    getUser(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id).subscribe(user => this.user = user);
    }

    likeUser(user): void {
        this.userService.likeUser(user.id).subscribe(result => {
            user.liked = true;
        });
    }

    goBack(): void {
        this.location.back();
    }

}
