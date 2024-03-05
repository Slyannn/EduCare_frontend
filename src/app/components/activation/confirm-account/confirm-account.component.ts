import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements  OnInit {

  constructor(private login : LoginService, private route: Router) {
  }
  ngOnInit(): void {

  }

  resendEmail():void{
    this.login.resendEmail(this.login.getUser().email).subscribe(
      (data) =>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.success
        }
      );
        setTimeout(() => {
          this.route.navigate(['login']).then(r => console.log(r));
        }, 2000)
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Echec de l\'enregistrement',
          text: error.message,
        });

      }
    )
  }


}
