import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganismService} from "../../../services/organism.service";
import {NeedService} from "../../../services/need.service";
import {Need} from "../../../models/need";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})
export class SignupComponent implements OnInit {

  public needs!: Need[];
  public organismFormGroup !: FormGroup;
  public userFormGroup !: FormGroup;
  public addressFormGroup !: FormGroup;
  public uploadFormGroup !: FormGroup;


  constructor(private organismService: OrganismService,
              private needService: NeedService,
              private fb: FormBuilder,
              private route: Router
              ) {
    if(localStorage.getItem('needs')){
      this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
    }

    this.userFormGroup  = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
    },  { validators: this.passwordMatchValidator });

    this.organismFormGroup = fb.group({
      name: ['', [Validators.required]  ],
      phone: ['', [Validators.required]],
      description: [''],
      services : this.fb.array([], [Validators.required]),
      organismEmail: ['', [Validators.required, Validators.email]],
    });

    this.addressFormGroup  = fb.group({
      street: ['', [Validators.required]],
      city: ['',[ Validators.required]],
      zipCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });


    this.uploadFormGroup = fb.group({
      certificate: [null, [Validators.required]],
      logo : [null,[Validators.required]],
    });

  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const passwordRepeat = group.get('passwordRepeat')?.value;

    return password === passwordRepeat ? null : { passwordMismatch: true };
  }

  get user() { return this.userFormGroup.controls; }
  get address() { return this.addressFormGroup.controls; }
  get organism() { return this.organismFormGroup.controls; }

  get upload() { return this.uploadFormGroup.controls; }

  buttonDisabled(): boolean{
    return this.userFormGroup.invalid || this.addressFormGroup.invalid || this.organismFormGroup.invalid || this.uploadFormGroup.invalid;
  }


  onImageChange(event: any) {
    const file = event.target.files[0];
    this.uploadFormGroup.patchValue({ logo : file });
    this.uploadFormGroup.patchValue({ certificate : file });

  }

  onCheckboxChange(e: any) {
    const services : FormArray = this.organismFormGroup.get('services') as FormArray;
    if (e.target.checked) {
      services.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      services.controls.forEach((a : any) => {
        if (a.value == e.target.value) {
          services.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  ngOnInit(): void {

    this.needService.getAllNeeds().subscribe(data => {
      //in local storage save
      localStorage.setItem('needs', JSON.stringify(data));
      this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
    })
  }



  onSubmit():void {
    //console,log all data
    if(this.userFormGroup.get('password')?.value !== this.userFormGroup.get('passwordRepeat')?.value){
      Swal.fire({
        icon: 'error',
        title: 'Echec de l\'enregistrement',
        text: 'Les mots de passe ne correspondent pas',
      })
      return;
    }

    const formData = new FormData();
    //OrganismAdmin
    formData.append('name', this.organismFormGroup.get('name')?.value);
    formData.append('phone', this.organismFormGroup.get('phone')?.value);
    formData.append('description', this.organismFormGroup.get('description')?.value);
    formData.append('organismEmail', this.organismFormGroup.get('organismEmail')?.value);
    formData.append('logo', this.uploadFormGroup.get('logo')?.value);

    let arrServices: any = this.organismFormGroup.get('services')?.value as FormArray;

    for (let i = 0; i < arrServices.length; i++) {
      formData.append('services['+i+'][id]', arrServices[i]);
      formData.append('services['+i+'][name]', 'xxx');
    }


    //Address
    formData.append('address[street]', this.addressFormGroup.get('street')?.value);
    formData.append('address[city]', this.addressFormGroup.get('city')?.value);
    formData.append('address[zipcode]', this.addressFormGroup.get('zipCode')?.value);
    formData.append('address[country]', this.addressFormGroup.get('country')?.value);

    //Profile
    formData.append('profile[certificate]', this.uploadFormGroup.get('certificate')?.value);
    //User profile[user][email]
    formData.append('profile[user][email]', this.userFormGroup.get('email')?.value);
    formData.append('profile[user][password]', this.userFormGroup.get('password')?.value);

    //save in Backend

    this.organismService.signup(formData).subscribe(
      () => {
        Swal.fire('Success', 'Vous etes maintenant enregistré', 'success');
        this.route.navigate(['/accueil']).then(r => console.log(r)  );
      },
      (error) => {
        console.log("Error saving organism", error);
        Swal.fire({
          icon: 'error',
          title: 'Echec de l\'enregistrement',
          text: error.message,
        })
      });


  }

}
