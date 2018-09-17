import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationModule} from './auth.module';
import {LogoutComponent} from './logout/logout.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        HomeComponent,
        RegisterComponent,
        UsersComponent,
        UserComponent,
        MenuComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        AuthenticationModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
