import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganismService} from "../../../services/organism.service";
import {NeedService} from "../../../services/need.service";
import {Need} from "../../../models/need";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {matchpassword} from "../../../services/matchpassword.validator";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public needs!: Need[];
  public organismForm!: FormGroup;



  constructor(private organismService: OrganismService,
              private needService: NeedService,
              private fb: FormBuilder,
              private route: Router
              ) {
    if(localStorage.getItem('needs')){
      this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
    }


    this.organismForm = fb.group({
      name: ['', [Validators.required]  ],
      description: [''],
      certificate: [null, [Validators.required]],
      logo : [null,[Validators.required]],
      services : this.fb.array([], [Validators.required]),

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],

      street: ['', [Validators.required]],
      city: ['',[ Validators.required]],
      zipCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
    }, {
      validators: matchpassword
    });

  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    this.organismForm.patchValue({ logo : file });
    this.organismForm.patchValue({ certificate : file });

  }

  onCheckboxChange(e: any) {
    const services : FormArray = this.organismForm.get('services') as FormArray;
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
    //check if passwords match
    if(this.organismForm.get('password')?.value !== this.organismForm.get('password2')?.value){
      Swal.fire({
        icon: 'error',
        title: 'Echec de l\'enregistrement',
        text: 'Les mots de passe ne correspondent pas',
      })
      return;
    }
    const formData = new FormData();
    formData.append('name', this.organismForm.get('name')?.value);
    formData.append('description', this.organismForm.get('description')?.value);
    formData.append('certificate', this.organismForm.get('certificate')?.value);
    formData.append('logo', this.organismForm.get('logo')?.value);
    formData.append('user[email]', this.organismForm.get('email')?.value);
    formData.append('user[password]', this.organismForm.get('password')?.value);
    formData.append('user[address][street]', this.organismForm.get('street')?.value);
    formData.append('user[address][city]', this.organismForm.get('city')?.value);
    formData.append('user[address][zipCode]', this.organismForm.get('zipCode')?.value);
    formData.append('user[address][country]', this.organismForm.get('country')?.value);
    //foreach need in needs
    let arrServices: any = this.organismForm.get('services')?.value as FormArray;

    //read alls services and formData appen
    for (let i = 0; i < arrServices.length; i++) {
      formData.append('services['+i+'][id]', arrServices[i]);
      formData.append('services['+i+'][name]', 'xxx');
    }

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
