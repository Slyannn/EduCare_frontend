import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrganismAdmin } from 'src/app/models/organismAdmin';
import { OrganismService } from 'src/app/services/organism.service';
// @ts-ignore
import * as L from 'leaflet';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  standalone: true,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  organism!:OrganismAdmin;
  hasProfile!:boolean;
  constructor(
    private http:HttpClient,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer les paramètres de la route
    this.route.params.subscribe(params => {
      let id = params['id']
      let organisms = localStorage.getItem('organismList') ? JSON.parse(localStorage.getItem('organismList') || '{}') : []
      for(let org of organisms)
        if (org.id == id)
          this.organism = org;

      if(this.organism.profile == null || this.organism.profile == undefined)
        this.hasProfile = false
      else
        this.hasProfile = true;

    });
    this.geocode(this.organism.address.street+", "+this.organism.address.zipCode+" "+this.organism.address.city+" "+this.organism.address.country)
    .subscribe(response => {
      if (response && response.length > 0) {
        const latitude = response[0].lat;
        const longitude = response[0].lon;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // Utiliser les coordonnées pour afficher un marqueur sur la carte, etc.
        this.displayMap(latitude,longitude);
      }
      else {
        console.error('Adresse introuvable');
      }

    })
  }

  geocode(address: string) {
    // Effectuer une requête de géocodage à Nominatim
    return this.http.get<any>(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);
  }
  displayMap(latitude : number, longitude:number){
        // Créez une carte Leaflet
        const map = L.map('map').setView([latitude, longitude], 13);

        // Ajoutez une couche de tuiles OpenStreetMap à la carte
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Ajoutez un marqueur à la position spécifiée
        L.marker([latitude, longitude]).addTo(map)
          .bindPopup('Votre position').openPopup();
  }

}
