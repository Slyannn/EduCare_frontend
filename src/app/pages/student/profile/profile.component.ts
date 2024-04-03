import {Component, OnInit} from '@angular/core';

import {User} from "../../../models/user";
import {LoginService} from "../../../services/login.service";


@Component({
  selector: 'app-profile-student',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent  implements OnInit {
  user!: User;
  currentToken!:string;
  constructor(private login: LoginService ) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.currentToken = this.login.getToken();
  }


}
