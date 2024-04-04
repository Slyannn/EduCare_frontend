import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {LoginService} from "../../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrganismService} from "../../../services/organism.service";
import Swal from "sweetalert2";
import { Organism } from 'src/app/models/organism';
import { OrganismAdmin } from 'src/app/models/organismAdmin';
import { NeedService } from 'src/app/services/need.service';
import { Need } from 'src/app/models/need';

@Component({
  selector: 'app-update-organism',
  templateUrl: './update-organism.component.html',
  styleUrls: ['./update-organism.component.css']
})
export class UpdateOrganismComponent implements OnInit {
  user!: User;
  userToken!: any;
  organism!: Organism;
  public needs!: Need[];

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
    private needService: NeedService,
    private organismService: OrganismService) {
    
  }
  ngOnInit(): void {
if(localStorage.getItem('needs')){
      this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
    }

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
      zipCode: this.user.organism.organismAdmin.address.zipCode,
      city: this.user.organism.organismAdmin.address.city,
      country: this.user.organism.organismAdmin.address.country,
      street: this.user.organism.organismAdmin.address.street
    });

    this.profileFormGroup = this.fb.group(
      {
        name: ['', [Validators.required]  ],
        email: ['', [Validators.required, Validators.email]],
        logo: [null, [Validators.required]],
        phone:['', [Validators.required]],
        contactemail:['', [Validators.required, Validators.email]],
        description:['', [Validators.required]],
        services : this.fb.array([], [Validators.required]),
      }
    );

    this.profileFormGroup.patchValue({
      name:this.user.organism.organismAdmin.name,
      email: this.user.email,
      phone: this.user.organism.organismAdmin.phone,
      contactemail: this.user.organism.organismAdmin.organismEmail,
      description: this.user.organism.organismAdmin.description, 
    });

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required ],
    });
  }

  updateUser(): void {
    
    let isCurrentPasswordValid = false;

    //console.log(this.userFormGroup, this.addressFormGroup,this.profileFormGroup);
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

        const formData = new FormData();

        // Ajoutez les données de l'OrganismAdmin
        formData.append('name', this.profileFormGroup.get('name')?.value);
        formData.append('phone', this.profileFormGroup.get('phone')?.value);
        formData.append('description', this.profileFormGroup.get('description')?.value);
        formData.append('organismEmail', this.profileFormGroup.get('contactemail')?.value);
        formData.append('logo', this.profileFormGroup.get('logo')?.value);
      
        const services = this.profileFormGroup.get('services')?.value as string[];
        services.forEach((service: string, index: number) => {
          formData.append(`services[${index}][id]`, service); // Supposant que service est une chaîne d'identifiant de service
          formData.append(`services[${index}][name]`, 'xxx'); // Supposant que 'xxx' est un nom de service par défaut
        });
      
        // Ajoutez les données d'adresse
        formData.append('address[street]', this.addressFormGroup.get('street')?.value);
        formData.append('address[city]', this.addressFormGroup.get('city')?.value);
        formData.append('address[zipcode]', this.addressFormGroup.get('zipCode')?.value);
        formData.append('address[country]', this.addressFormGroup.get('country')?.value);
      
        // Ajoutez les données de profil
        formData.append('profile[user][email]', this.profileFormGroup.get('email')?.value);
        formData.append('profile[user][password]', this.userFormGroup.get('currentPassword')?.value);
      

        if (this.userFormGroup.value.changePassword) {
          if (this.userFormGroup.value.newPassword !== this.userFormGroup.value.repeatNewPassword) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Les nouveaux mots de passe ne correspondent pas!',
            });
            return;
          }
          formData.append('profile[user][password]', this.userFormGroup.get('newPassword')?.value);
        }
console.log(formData.get('services[0]'));

        this.organismService.updateOrganism(this.user.organism.id, formData).subscribe(
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


  }



   
  onImageChange(event: any) {
    const file = event.target.files[0];
    //this.profileFormGroup.patchValue({ logo : file });
  }
  
  onCheckboxChange(e: any) {
    const services : FormArray = this.profileFormGroup.get('services') as FormArray;
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

}
