import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganismAdmin } from 'src/app/models/organismAdmin';

@Component({
  selector: 'app-profile-organism',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{

  organism!:OrganismAdmin;
  hasProfile!:boolean;
  constructor(
    private http:HttpClient,
    private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let name = params['name']

      let organisms = localStorage.getItem('organismList') ? JSON.parse(localStorage.getItem('organismList') || '{}') : []
      for(let org of organisms)
        if (org.name === name)
          this.organism = org;

      if(this.organism.profile == null || this.organism.profile == undefined)
        this.hasProfile = false
      else
        this.hasProfile = true;

    });

  }
}
