import { Component, OnInit } from '@angular/core';
import { iif } from 'rxjs';
import { Need } from 'src/app/models/need';
import { OrganismAdmin } from 'src/app/models/organismAdmin';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { NeedService } from 'src/app/services/need.service';
import { OrganismService } from 'src/app/services/organism.service';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit{
  
  user!: User;
  needs!: Need[];
  isLoggedIn!: boolean;
  organismList!: OrganismAdmin[];
  organismListFiltered!: OrganismAdmin[];
  selectedButtons: Set<string> = new Set();

  constructor(
    private needService: NeedService,
    private orgaService: OrganismService,
    private login:LoginService
  ) {
    if(localStorage.getItem('needs')){
      this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
            
    }
    if(localStorage.getItem('organismList')){
      this.organismList = localStorage.getItem('organismList') ? JSON.parse(localStorage.getItem('organismList') || '{}') : [];
      this.organismListFiltered = this.organismList;
    }
  }

  filterOrganismList(){
    if(this.selectedButtons.size == 0 || this.selectedButtons == null)
      this.organismListFiltered = this.organismList;
    else{
      this.organismListFiltered = [];
      this.selectedButtons.forEach(needName =>{
        this.organismList.forEach(org => {
          if(org.services.some(need => need.name === needName) && !this.organismListFiltered.includes(org))
            this.organismListFiltered.push(org);
        })
      })
    }
  }
  isSelected(need: any): boolean {
    return this.selectedButtons.has(need.name);
  }
  toggleSelection(need: Need): void {
    if (this.isSelected(need)) {
      this.selectedButtons.delete(need.name);
      this.filterOrganismList();
    } else {
      this.selectedButtons.add(need.name);
      this.filterOrganismList();
    }
  }

  ngOnInit(): void {
    
    if(!localStorage.getItem('needs')){
      this.needService.getAllNeeds().subscribe(data => {
        //in local storage save
        localStorage.setItem('needs', JSON.stringify(data));
        this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
        
      });
    }
    if(!localStorage.getItem('organismList')){
      this.orgaService.getAllOrganisms().subscribe(data =>{
        localStorage.setItem('organismList', JSON.stringify(data));
        this.organismList = data;
        this.organismListFiltered = this.organismList;
      });
    }



      //Verifying user login for details page
      this.isLoggedIn = this.login?.isLoggedIn();
      this.user = this.login?.getUser();
  
      this.login?.loginStatusSubject?.asObservable().subscribe(data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      });


  }



}
