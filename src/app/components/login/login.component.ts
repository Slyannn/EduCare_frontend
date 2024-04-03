import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements  OnInit {

  public form!: FormGroup;
  public error:boolean = false;
  hide = true;
  public echecLogin: boolean = false;
  public invalidDetails : boolean = false;
  public currentToken!:string;

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private route: Router) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required ],
    });

  }

  ngOnInit(): void {
    this.currentToken = this.loginService.getToken();
  }

  onSubmit(): void {
    this.loginService.login(this.form.value).subscribe(
      (data) => {
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser(data.token).subscribe(
          (user: User) => {

            this.loginService.setUser(user);

            if( user.verified && this.loginService.getUserRole() == 'ROLE_STUDENT'){
              this.route.navigate(['/student/profile']).then(r => console.log(r)  );
              this.loginService.loginStatusSubject.next(true);
            }else if( user.verified && this.loginService.getUserRole() == 'ROLE_ORGANISM') {
              this.route.navigate(['/organism/profile']).then(r => console.log(r)  );
              this.loginService.loginStatusSubject.next(true);
            }else if( !user.verified){
              this.route.navigate(['activation']).then(r => console.log(r) );
            } else {
              this.invalidDetails = true;
              this.loginService.logout();
            }
          },
          (err) => {
            console.error('Error fetching current user:', err);
          }
        );
      },
      (error) => {
        this.echecLogin = true;
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Email ou Password est incorrect!' });

      }
    );
  }
}
