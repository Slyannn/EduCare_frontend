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
  data !: Organism[];
  filteredData : Organism[] = [];
  categorie : string = "";
  needsList : Need[] = [];

  constructor(private organisms:OrganismService, private needs:NeedService){
   // this.fetchdata();
    
   if(localStorage.getItem('needs')){
    this.needsList = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
  }

  if(localStorage.getItem('organisms')){
    this.data = localStorage.getItem('organisms') ? JSON.parse(localStorage.getItem('organisms') || '{}') : [];
    this.filteredData = this.data;
  }

  }
  
  ngOnInit(): void { 
    
    //Get all Needs in the LocalStorage
    this.needs.getAllNeeds().subscribe(data => {
      localStorage.setItem("needs",JSON.stringify(data));
      var local : string | null = localStorage.getItem("needs");
      if(local)
      this.needsList = JSON.parse(local);
      else
        console.log("Error when trying to retrieve data from localstorage");
    
    });


    //Get all organisms in the LocalStorage
    this.organisms.getAllOrganisms().subscribe(data => {
      
        localStorage.setItem("organisms",JSON.stringify(data));
        var local : string | null = localStorage.getItem("organisms");
        if(local)
          this.data = JSON.parse(local);
        else
          console.log("Error when trying to retrieve data from localstorage");
      
    });

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
