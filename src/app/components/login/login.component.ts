import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Student} from "../../models/student";
import {Organism} from "../../models/organism";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements  OnInit {

  public form!: FormGroup;
  public error:boolean = false;

  public echecLogin: boolean = false;
  public invalidDetails : boolean = false;

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private route: Router) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required ],
    });

  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.loginService.login(this.form.value).subscribe(
      (data) => {;
        this.loginService.getOneUser(this.form.value.email).subscribe(
          (user: User) => {
            this.loginService.saveUserData(user);
            if(this.loginService.getUserRole() == 'ROLE_STUDENT'){
              this.route.navigate(['/student/profile']).then(r => console.log(r)  );
              this.loginService.loginStatusSubject.next(true);
            }else if(this.loginService.getUserRole() == 'ROLE_ORGANISM') {
              this.route.navigate(['/organism/profile']).then(r => console.log(r)  );
              this.loginService.loginStatusSubject.next(true);
            }else {
              this.invalidDetails = true;
              this.loginService.logout();
            }

          },
        );
      },
      (error) => {
        this.echecLogin = true;
        console.log(error);
      }
    );


  }
}
