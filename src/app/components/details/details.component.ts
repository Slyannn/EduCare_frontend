import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganismAdmin } from 'src/app/models/organismAdmin';
import { OrganismService } from 'src/app/services/organism.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  organism!:OrganismAdmin;
  constructor(
    private orgaService: OrganismService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer les paramètres de la route
    this.route.params.subscribe(params => {
      console.log(params['id']); // Accéder au paramètre 'id'
      this.orgaService.getOrganismByID(params['id']).subscribe(data =>{
        this.organism = data;
      })
    });
  }


}
