import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PublicGuard, ProtectedGuard} from 'ngx-auth';
import {LogoutComponent} from './logout/logout.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, canActivate: [PublicGuard]},
    {path: 'login', component: LoginComponent, canActivate: [PublicGuard]},
    {path: 'logout', canActivate: [ProtectedGuard], component: LogoutComponent},
    {path: 'home', component: HomeComponent, canActivate: [ProtectedGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [ProtectedGuard]},
    {path: 'users', component: UsersComponent, canActivate: [ProtectedGuard]},
    {path: 'users/:id', component: UserComponent, canActivate: [ProtectedGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
