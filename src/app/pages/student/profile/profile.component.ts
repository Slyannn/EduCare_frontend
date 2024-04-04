import {Component, OnInit} from '@angular/core';

import {User} from "../../../models/user";
import {LoginService} from "../../../services/login.service";
import {Review} from "../../../models/review";
import {ReviewService} from "../../../services/review.service";


@Component({
  selector: 'app-profile-student',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent  implements OnInit {
  user!: User;
  currentToken!:string;
  currentAvis:number = 0;
  reviews: Review[] = [];
  constructor(private login: LoginService,
              private reviewService: ReviewService) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('reviews')){
      this.reviews= localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews') || '{}') : [];
    }
    this.user = this.login.getUser();
    this.currentToken = this.login.getToken();

    this.reviewService.reviews().subscribe(
      (data) => {
        localStorage.setItem('reviews', JSON.stringify(data));
        this.reviews = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews') || '{}') : [];
        this.reviews = this.reviews.filter((review) => review.author.id === this.user.student.id);
      }
    );
  }


  nextAvis() {
    if (this.currentAvis < this.reviews?.length - 1) {
      this.currentAvis++;
    } else {
      this.currentAvis = 0;
    }
  }

  prevAvis() {
    if (this.currentAvis > 0) {
      this.currentAvis--;
    } else {
      this.currentAvis = this.reviews?.length - 1;
    }
  }



}