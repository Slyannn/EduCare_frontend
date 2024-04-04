import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { OrganismAdmin } from 'src/app/models/organismAdmin';
import {LoginService} from "../../../services/login.service";
import {OrganismService} from "../../../services/organism.service";
import {User} from "../../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from "../../../models/message";
import Swal from "sweetalert2";
import {Review} from "../../../models/review";


@Component({
  selector: 'app-profile-organism',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  organism!: OrganismAdmin;
  hasProfile: boolean = false;
  user!: User;
  userAdress:string = "";
  param!: any;
  currentToken!: string;
  isMyProfile: boolean = false;
  public messageFormGroup !: FormGroup;
  isLogged: boolean = false;

  reviews: Review[]=[];
  currentAvis = 0;


  constructor(
    private route: ActivatedRoute,
    private login: LoginService,
    private organismService: OrganismService,
    private fb: FormBuilder,
    private router: Router) {
  }


  ngOnInit(): void {
    this.currentToken = this.login?.getToken();
    this.isLogged = this.login?.isLoggedIn();
    //Un utilisateur est connecté
    this.user = this.login.getUser();

    if (this.route.snapshot.paramMap.get('name') != null) {
      //Lorsque l'organisme est visité
      this.param = this.route.snapshot.paramMap.get('name');
      this.organism = this.organismService.getOrganismByName(this.param);

    } else
      //profil de l'organisme connecté
    if (this.user.organism) {
      let organismName = this.user.organism.organismAdmin.name;
      this.organism =this.organismService.getOrganismByName(organismName);
      this.hasProfile = true;
      //this.isMyProfile = true;
    }

    if(this.user.student){
      this.userAdress = 
        this.user.student.address.street + ', ' +
        this.user.student.address.zipCode + ', ' +
        this.user.student.address.city + ', ' +
        this.user.student.address.country;
    }

    if (this.organism?.profile) {
      this.hasProfile = true;

      if (this.organism?.profile?.id === this.user?.organism?.id) {
        this.isMyProfile = true;
      }
    }

    const address =
      this.organism.address.street + ', ' +
      this.organism.address.zipCode + ', ' +
      this.organism.address.city + ', ' +
      this.organism.address.country;

    this.initMap();

    if (!this.isLogged && this.hasProfile) {
      this.router.navigate(['/login']);
    }

    this.reviews = this.organism.profile.reviews;

    this.messageFormGroup = this.fb.group({
      subject: [{value: '', disabled: this.isMyProfile}, [Validators.required]],
      content: [{value: '', disabled: this.isMyProfile}, [Validators.required]]
    });

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



  initMap() {
    const geocoder = new google.maps.Geocoder();
    const address = this.organism.address.street + ', ' +
      this.organism.address.zipCode + ', ' + this.organism.address.city + ', ' + this.organism.address.country;

    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        if(results){
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer();
          
          const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
            zoom: 17,
            center: results[0].geometry.location
          });
          if(this.userAdress === ""){
            const marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: address
            });
          }
          else{
            directionsRenderer.setMap(map);
            const request = {
              origin: this.userAdress,
              destination: address,
              travelMode: google.maps.TravelMode.DRIVING, // Mode de déplacement (DRIVING pour conduire)
            };
          
            directionsService.route(request, (result, status) => {
              if (status == 'OK') {
                directionsRenderer.setDirections(result);
              } else {
                console.error('Erreur lors de la récupération des directions:', status);
              }
            });
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(results[0].geometry.location);
            geocoder.geocode({'address': this.userAdress}, (results,status)=>{
              if(status === 'OK'){
                if(results){
                  const marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: {
                      url: 'http://127.0.0.1:8000/uploads/position.png', // URL de l'icône bleue
                      scaledSize: new google.maps.Size(42, 42) // Taille de l'icône
                    },
                    title: "Votre position"
                  });
                  bounds.extend(results[0].geometry.location);
                  map.fitBounds(bounds); // Zoom pour afficher les deux positions
                }
              }
            })
          }

          
        }
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  get message() { return this.messageFormGroup.controls; }

  buttonDisabled():boolean {
    return this.messageFormGroup.invalid || this.isMyProfile;
  }

  sendMessage():void {
    const $message = new Message();
    $message.content = this.messageFormGroup.value.content;
    $message.subject = this.messageFormGroup.value.subject;
    $message.sender = this.user.email;
    $message.receiver = this.organism.organismEmail;

    this.organismService.sendMessage($message).subscribe(
      data => {
        this.messageFormGroup.reset();
        Swal.fire({
          icon: 'success',
          title: 'Message envoyé',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'envoi du message',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
}
