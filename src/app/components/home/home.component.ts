import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {LoginService} from "../../services/login.service";
import {GoogleMap, MapGeocoder, MapMarker} from "@angular/google-maps";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: User;
  isLoggedIn: boolean = false;
  map!: GoogleMap;
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


  constructor(private login: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login?.isLoggedIn();
    this.user = this.login?.getUser();
    this.login?.loginStatusSubject?.asObservable().subscribe(data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

}


