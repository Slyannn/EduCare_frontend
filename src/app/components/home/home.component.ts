import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: User;
  isLoggedIn: boolean = false;


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


