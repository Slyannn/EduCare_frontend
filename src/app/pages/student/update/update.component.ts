import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {LoginService} from "../../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../../services/student.service";
import Swal from "sweetalert2";
import {Student} from "../../../models/student";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  user!: User;
  userToken!: any;
  student!: Student;

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
              private studentService: StudentService) {


  }

  ngOnInit(): void {
    this.userToken = this.route.snapshot.paramMap.get('token');
    this.user = this.login.getUserByToken(this.userToken);

    this.userFormGroup  = this.fb.group({
      currentPassword: ['', [Validators.required]],
      changePassword: [false],
      newPassword: [''],
      repeatNewPassword: [''],
    });

    this.addressFormGroup  = this.fb.group({
      street: ['', [Validators.required]],
      city: ['',[ Validators.required]],
      zipCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });

    this.addressFormGroup.patchValue({
      zipCode: this.user.student.address.zipCode,
      city: this.user.student.address.city,
      country: this.user.student.address.country,
      street: this.user.student.address.street
    });

    this.profileFormGroup = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        university: ['', [Validators.required]],
      }
    );

    this.profileFormGroup.patchValue({
      email: this.user.email,
      university: this.user.student.university
    });

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required ],
    });
  }



  updateUser(): void {
    let isCurrentPasswordValid = false;

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

        this.student = new Student();
        this.student.id = this.user.student.id;
        this.student.firstname = this.user.student.firstname;
        this.student.lastname = this.user.student.lastname;
        this.student.university = this.profileFormGroup.value.university;

        //address
        this.student.address = this.addressFormGroup.value;

        //user
        this.student.user = new User();
        this.student.user.email = this.profileFormGroup.value.email;
        this.student.user.password = this.userFormGroup.value.currentPassword;

        if (this.userFormGroup.value.changePassword) {
          if (this.userFormGroup.value.newPassword !== this.userFormGroup.value.repeatNewPassword) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Les nouveaux mots de passe ne correspondent pas!',
            });
            return;
          }
          this.student.user.password = this.userFormGroup.value.newPassword;
        }

        this.studentService.updateStudent(this.student.id, this.student).subscribe(
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
                this.user.student = this.student;
                this.login.setUser(updateUser);
                this.router.navigate(['/student/profile']);
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


  }

}
