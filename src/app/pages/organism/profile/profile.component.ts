import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user!: User;
  isLoggedIn: boolean = false;
  currentUser!: any;

  constructor(private login: LoginService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.login?.isLoggedIn();
    this.user = this.login?.getUser();

    this.login?.loginStatusSubject?.asObservable().subscribe(data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });

  }
}
