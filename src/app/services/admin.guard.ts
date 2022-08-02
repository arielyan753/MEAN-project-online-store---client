import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';



@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    public constructor(private notify: NotifyService, private router: Router) { }

    canActivate(): boolean {

        if (store.getState().authState.token && store.getState().authState.user.role === 'Admin') {
            return true;
        }

        this.notify.error("You are not Authorized");
        this.router.navigateByUrl("/welcome");
        return false;
    }


}