import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from "../../../services/login.service";
import {User} from "../../../models/user";
import {OrganismAdmin} from "../../../models/organismAdmin";
import {OrganismService} from "../../../services/organism.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReviewService} from "../../../services/review.service";
import {Review} from "../../../models/review";
import Swal from "sweetalert2";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  user!: User;
  organism!: OrganismAdmin;
  param: any;
  public reviewFormGroup !: FormGroup;
  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private login: LoginService,
    private organismService: OrganismService,
    private fb: FormBuilder,
    private reviewService : ReviewService
  ) {
  }

  public ngOnInit() {
    this.user = this.login.getUser();

    if(this.route.snapshot.paramMap.get('name') != null){
      //Lorsque l'organisme est visité
      this.param= this.route.snapshot.paramMap.get('name');
      this.organism = this.organismService.getOrganismByName(this.param);
    }

    if(!this.user?.student){
      this.router.navigate(['/organism/profile']);
    }

    this.reviewFormGroup= this.fb.group({
      content: ['',[ Validators.required]],
      //select et option
      note: ['', [Validators.required]]
    });
  }

  buttonDisabled():boolean {
    return this.reviewFormGroup.invalid;
  }

  postReview():void{
    const review = new Review();

    review.content = this.reviewFormGroup.value.content;
    review.note = this.reviewFormGroup.value.note;
    review.author_id = this.user.student.id;
    review.organism_id = this.organism.profile.id;

    this.reviewService.postReview(review).subscribe(
      (data) =>{
        Swal.fire({
          icon: 'success',
          title: 'Review posté',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/organism/profile', this.organism.name]);
      },
      (error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors du poste du review',
          showConfirmButton: false,
          timer: 1500
        });
      }

    )

  }


}
