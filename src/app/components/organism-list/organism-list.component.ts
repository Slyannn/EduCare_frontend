import {Component, OnInit, ViewChild} from '@angular/core';
import {OrganismAdmin} from "../../models/organismAdmin";
import {OrganismService} from "../../services/organism.service";
import {NeedService} from "../../services/need.service";
import {Need} from "../../models/need";




@Component({
  selector: 'app-organism-list',
  templateUrl: './organism-list.component.html',
  styleUrls: ['./organism-list.component.css'],
})
export class OrganismListComponent implements  OnInit{

  selectedOrganismAdmins: Need[] = [];
  organismAdmins!: OrganismAdmin[];
  organismLength!: number;

  

    constructor(
      private organismService: OrganismService,
      private needService: NeedService,
    ) { }

    ngOnInit(): void {
      this.needService.organismAdminSelected.subscribe(data => {
        if (data.length === 0) {
          this.getAllOrganisms();
        } else {
          this.selectedOrganismAdmins = data;
          this.organismAdmins = [];
          this.organismService.getFilteredOrganisms(data).subscribe(data => {
            this.organismAdmins = data;
            this.organismLength = data.length;
            
          });
        }
      });
    }

    //get all organisms
    getAllOrganisms(): void {
      this.organismService.getAllOrganisms().subscribe(data => {
        this.organismAdmins = data;
      });
    }
    

}
