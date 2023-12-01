import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  user!: User;
  isLoggedIn:boolean = false;

  constructor(private  login: LoginService) {

  }
  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    this.login.loginStatusSubject.asObservable().subscribe(data =>{
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
    this.login.getUser().subscribe(
      ()=>{},
      ()=>{
        this.login.logout();
      }
    )


  }


  public logout(): void {
    this.login.logout();
    this.login.loginStatusSubject.next(false);
   // this.route.navigate(['login']);
  }

}
