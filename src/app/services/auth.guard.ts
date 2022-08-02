import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

// ng g guard services/auth

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public constructor(private notify: NotifyService, private router: Router) { }

    // This function invoked whenever user tries to enter a route required to be logged-in
    // This function should return true if the user is actually logged in, or false if he isn't logged in:
    canActivate(): boolean {

        if (store.getState().authState.token && store.getState().authState.user.role !== 'Admin') {
            return true;
        }

        this.notify.error("You are not Authorized");
        this.router.navigateByUrl("/welcome");
        return false;
    }
}