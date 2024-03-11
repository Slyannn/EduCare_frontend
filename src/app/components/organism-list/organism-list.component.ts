import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrganismAdmin } from "../../models/organismAdmin";
import { OrganismService } from "../../services/organism.service";
import { NeedService } from "../../services/need.service";
import { Need } from "../../models/need";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  standalone: true
})
export class ModalComponent {
  constructor() {}
}

@Component({
  selector: 'app-organism-list',
  templateUrl: './organism-list.component.html',
  styleUrls: ['./organism-list.component.css'],
})
export class OrganismListComponent implements OnInit, OnChanges {

  selectedOrganismAdmins: Need[] = [];
  organismAdmins!: OrganismAdmin[];
  organismLength!: number;
  @Input() newSelections: Need[] = [];
  selectedOrganismAdminDetail: any;

  constructor(
    private organismService: OrganismService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('organismResult')){
      this.organismAdmins =localStorage.getItem('organismResult') ? JSON.parse(localStorage.getItem('organismResult') || '{}') : [];
    }else{
      this.loadOrganisms(this.newSelections);
    }
  }

  openModal(organismAdmin: any): void {
    this.selectedOrganismAdminDetail = organismAdmin;

    this.dialog.open(ModalComponent, {
      width: '600px', // Spécifiez la largeur appropriée
      data: this.selectedOrganismAdminDetail // Passez les données à la modal
    });
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
      }
    );
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['newSelections']) {
      this.loadOrganisms(this.newSelections);
    }
  }
}
