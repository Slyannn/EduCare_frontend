import { Component, OnInit } from '@angular/core';
import { Organism } from 'src/app/models/organism';
import { OrganismService } from 'src/app/services/organism.service';
import { Need } from 'src/app/models/Need';
import { NeedService } from 'src/app/services/need.service';


@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit{
  data : any;
  filteredData : any[] = [];
  categorie : string = "";
  needsList : Need[] = [];

  constructor(private organisms:OrganismService, private needs:NeedService){
   // this.fetchdata();
    
  }
  async fetchdata(){
    try{
      const response = await fetch("/assets/data.json");
      this.data = await response.json(); 
      this.filteredData = this.data;         
    }
    catch(error){
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
    }
  }
  ngOnInit(): void { 
    this.organisms.getAllOrganisms().subscribe(data => {
      this.data = data;
      this.filteredData = this.data;  
      console.log(this.data);
    })
    this.needs.getAllNeeds().subscribe(data=> this.needsList = data);
  }
  filter(selected:string) {
    if (selected === this.categorie) {
      this.categorie = '';
      this.filteredData = this.data;
    }
    else{
      this.categorie = selected;
      this.filteredData = this.data.filter((element : any) => {
        for(let i=0; i< element.services.length; i++){
          if (element.services[i].name === this.categorie) {
            return true;
          }
        }
        return false;
      });
    }
  }

  
  encodeParam(param: any): string {
    return encodeURIComponent(JSON.stringify(param));
  }
}
