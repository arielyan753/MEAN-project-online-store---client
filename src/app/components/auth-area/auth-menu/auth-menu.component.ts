import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  public user: UserModel;
  private unsubscribe: Unsubscribe;

  constructor() { }

  ngOnInit(): void {
    // get the info of user to show on auth menu
    this.user = store.getState().authState.user;
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

}