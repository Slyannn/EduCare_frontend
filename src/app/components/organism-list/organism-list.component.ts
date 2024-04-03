import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrganismAdmin } from "../../models/organismAdmin";
import { OrganismService } from "../../services/organism.service";
import {MatDialog} from "@angular/material/dialog";
import {Need} from "../../models/need";
import Swal from "sweetalert2";

@Component({
  selector: 'app-organism-list',
  templateUrl: './organism-list.component.html',
  styleUrls: ['./organism-list.component.css'],
})
export class OrganismListComponent implements OnInit, OnChanges {

  organismAdmins!: OrganismAdmin[];
  @Input() newSelections: Need[] = [];

  constructor(
    private organismService: OrganismService,
   ) { }

  ngOnInit(): void {
    if(localStorage.getItem('organismResult')){
      this.organismAdmins = this.organismService.getOrganismsFromLocalStorage();
    }else{
      this.loadOrganisms(this.newSelections);
    }
  }

  private loadOrganisms(selection: Need[]): void {
    this.organismService.getAllOrganisms().subscribe(
      data => {
        this.organismAdmins = data;
        this.organismService.saveOrganisms(this.organismAdmins);
        this.organismAdmins = this.newSelections.length > 0 ? this.organismService.filterOrganism(selection) : this.organismAdmins;
      },
      error => {
        console.error('Erreur lors du chargement des organismes', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors du chargement des organismes',
          text: error.message,
        })
      }
    );
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['newSelections']) {
      this.loadOrganisms(this.newSelections);
    }
  }
}
