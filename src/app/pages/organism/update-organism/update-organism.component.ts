import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {LoginService} from "../../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrganismService} from "../../../services/organism.service";
import Swal from "sweetalert2";
import { Organism } from 'src/app/models/organism';

@Component({
  selector: 'app-update-organism',
  templateUrl: './update-organism.component.html',
  styleUrls: ['./update-organism.component.css']
})
export class UpdateOrganismComponent implements OnInit {
  user!: User;
  userToken!: any;
  organism!: Organism;

  public userFormGroup !: FormGroup;
  public addressFormGroup !: FormGroup;
  public profileFormGroup !: FormGroup;
  public form!: FormGroup;
  hide1 = true;
  hide2 = true;
  hide3 = true;

  constructor(private login: LoginService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private organismService: OrganismService) {
    
  }
  ngOnInit(): void {
      
  }
  
  updateUser(): void {
    /*let isCurrentPasswordValid = false;

    if(this.userFormGroup.invalid || this.addressFormGroup.invalid || this.profileFormGroup.invalid){
      return;
    }

    this.form.patchValue({
      email: this.user.email,
      password: this.userFormGroup.value.currentPassword
    });

    if(this.form.value.password === '' || this.form.value.password.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez saisir votre mot de passe actuelle',
      }).then((result) => {
        return;
      });
    }

    this.login.login(this.form.value).subscribe(
      (response) => {
        isCurrentPasswordValid = true;
        if (!isCurrentPasswordValid) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Le mot de passe actuel est incorrect!',
          });
          return;
        }

        this.organism = new Organism();
        this.organism.id = this.user.organism.id;
        this.organism.user.email = this.user.email;
        this.organism.lastname = this.user.organism.lastname;
        this.organism.university = this.profileFormGroup.value.university;

        //address
        this.organism.organismAdmin.address = this.addressFormGroup.value;

        //user
        this.organism.user = new User();
        this.organism.user.email = this.profileFormGroup.value.email;
        this.organism.user.password = this.userFormGroup.value.currentPassword;

        if (this.userFormGroup.value.changePassword) {
          if (this.userFormGroup.value.newPassword !== this.userFormGroup.value.repeatNewPassword) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Les nouveaux mots de passe ne correspondent pas!',
            });
            return;
          }
          this.organism.user.password = this.userFormGroup.value.newPassword;
        }

        this.organismService.updateOrganism(this.organism.id, this.organism).subscribe(
          (updateUser) => {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Votre profil a été mis à jour avec succès!',
            }).then((result) => {
              if (this.userFormGroup.value.changePassword) {
                this.login.logout();
                this.router.navigate(['/login']);
              } else {
                this.user.organism = this.organism;
                this.login.setUser(updateUser);
                this.router.navigate(['/organism/profile']);
              }
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Une erreur est survenue lors de la mise à jour de votre profil!',
            });
          }
        );
      }
    );

*/
  }
}
