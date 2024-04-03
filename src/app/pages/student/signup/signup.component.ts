import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StudentService} from "../../../services/student.service";
import {User} from "../../../models/user";
import Swal from 'sweetalert2';
import {Student} from "../../../models/student";

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {

  public userFormGroup !: FormGroup;
  public addressFormGroup !: FormGroup;
  public profileFormGroup !: FormGroup;
  hide = true;
  hide1 = true;

    constructor(
      private studentService: StudentService,
      private fb: FormBuilder,
      private route: Router
    ) {
      this.userFormGroup  = fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        passwordRepeat: ['', [Validators.required]],
      },  { validators: this.passwordMatchValidator });

      this.addressFormGroup  = fb.group({
        street: ['', [Validators.required]],
        city: ['',[ Validators.required]],
        zipCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
      });

      this.profileFormGroup = fb.group(
        {
          firstname: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          university: ['', [Validators.required]],
        }
      );

    }
  isUserFormValid() {
    return this.userFormGroup.pristine || this.userFormGroup.valid;
  }

  isProfileFormValid(){
    return this.profileFormGroup.pristine || this.profileFormGroup.valid;
  }

  isAddressFormValid(){
    return this.addressFormGroup.pristine || this.addressFormGroup.valid;
  }


  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const passwordRepeat = group.get('passwordRepeat')?.value;

    return password === passwordRepeat ? null : { passwordMismatch: true };
  }

  get user() { return this.userFormGroup.controls; }
  get address() { return this.addressFormGroup.controls; }
  get profile() { return this.profileFormGroup.controls; }

  buttonDisabled(): boolean{
    return this.userFormGroup.invalid || this.addressFormGroup.invalid || this.profileFormGroup.invalid ;
  }

  ngOnInit(): void {}


  onSubmit(): void {
    if (this.userFormGroup.get('password')?.value !== this.userFormGroup.get('passwordRepeat')?.value) {
      Swal.fire({
        icon: 'error',
        title: 'Echec de l\'enregistrement',
        text: 'Les mots de passe ne correspondent pas',
      })
      return;
    }
    this.studentService.signup(this.saveData(this.userFormGroup,this.addressFormGroup, this.profileFormGroup ))
                        .subscribe(
      () => {
        Swal.fire('Success', 'Vous etes maintenant enregistré', 'success');
        this.route.navigate(['/accueil']).then(r => console.log(r));
      },
      (error) => {
        console.log("Error saving student", error);
        Swal.fire({
          icon: 'error',
          title: 'Echec de l\'enregistrement',
          text: error.message,
        });
      })
  }

  saveData(userFormGroup: any, addressFormGroup: any, profileFormGroup: any): Student{
    const user = new User();
    //set from userFormGroup
    user.email = userFormGroup.value.email;
    user.password = userFormGroup.value.password;
    user.password = userFormGroup.value.password;

    const address = addressFormGroup.value;
    address.country = addressFormGroup.value.country;
    address.city = addressFormGroup.value.city;
    address.street = addressFormGroup.value.street;
    address.zipCode = addressFormGroup.value.zipCode;

    const student = new Student();
    student.firstname = profileFormGroup.value.firstname;
    student.lastname = profileFormGroup.value.lastname;
    student.university = profileFormGroup.value.university;

    student.user = user;
    student.address = address;

    return student;
  }

}
