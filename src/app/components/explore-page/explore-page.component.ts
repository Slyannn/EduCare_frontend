import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent {
  data : any;
  filteredData : any[] = [];
  categorie : string = "";

  constructor(){
    this.fetchdata();
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
