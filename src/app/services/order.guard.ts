import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';


@Injectable({
    providedIn: 'root'
})
export class OrderGuard implements CanActivate {

    public constructor(private notify: NotifyService, private router: Router) { }

    // This function invoked whenever user tries to enter a route required to be logged-in
    // This function should return true if the user is actually logged in, or false if he isn't logged in:
    canActivate(): boolean {

        if (store.getState().cartDetailsState.cartDetails.length > 0) {
            return true;
        }

        this.notify.error("Your cart is empty");
        return false;
    }

}