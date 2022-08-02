import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityEnum } from 'src/app/models/city.enum';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userDataReg1 = new UserModel();
  public flag: string = '';
  public userDataReg2 = new UserModel();
  public cities = CityEnum;
  public city: string;



  constructor(private authService: AuthService, private notify: NotifyService, private router: Router) { }

  ngOnInit(): void {
  }

  // step one of register if no errors from backend more to step 2 at the end
  public async register1() {
    try {
      if (this.userDataReg1.password !== this.userDataReg1.confirmedPassword) {
        this.notify.error('Check again your password');
        return
      }
      this.userDataReg2 = await this.authService.registerStepOne(this.userDataReg1);
      this.flag = '1';
    }
    catch (err: any) {
      this.notify.error(err);
    }
  }

  // step 2 of register add the user to database
  public async register2() {
    try {
      await this.authService.registerStepTwo(this.userDataReg2);
      this.notify.success("You have been registered");
    }
    catch (err: any) {
      this.notify.error(err);
    }

  }


}


