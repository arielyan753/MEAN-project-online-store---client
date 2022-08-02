import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    @Output()
    public flagChanger = new EventEmitter<string>();
    
    public credentials = new UserModel();

    constructor(private authService: AuthService, private notify: NotifyService, private router: Router) { }

    // login function
    public async submit() {
        try {
            await this.authService.login(this.credentials);
            const userRole = store.getState().authState.user.role;
            this.notify.success("You have been logged in");
            if (userRole === 'Admin') {
                this.router.navigateByUrl("/admin");
            }
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

    // handle flag of welcome so need to emit the change flag
    public changeFlag() {
        this.flagChanger.emit('');
    }
}

