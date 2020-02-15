import { Component } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { MeteorUserService } from '../shared/services/meteor-user.service';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  loginIcon = faSignInAlt;

  constructor(private router: Router, private meteorUserService: MeteorUserService) {}

  loginWithGoogle() {
    Meteor.loginWithGoogle({}, error => {
      if (error) {
      } else {
        this.meteorUserService.updateUser();
        window.location.reload();
      }
    });
  }
}
