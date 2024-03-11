import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NeedService} from "../../services/need.service";
import {Need} from "../../models/need";
import {OrganismService} from "../../services/organism.service";
import {OrganismAdmin} from "../../models/organismAdmin";

@Component({
  selector: 'app-explor',
  templateUrl: './explor.component.html',
  styleUrls: ['./explor.component.css']
})
export class ExplorComponent implements OnInit {
  needs!: Need [];
  selectedButtons: Set<string> = new Set();
  selectedNeeds: Need[] = [];

  constructor(
    private needService: NeedService,
  ) {
    if(localStorage.getItem('needs')){
      this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
    }
  }

  isSelected(need: any): boolean {
    return this.selectedButtons.has(need.name);
  }
  toggleSelection(need: Need): void {
    if (this.isSelected(need)) {
      this.selectedButtons.delete(need.name);
      this.needService.removeNeed(need);
      this.selectedNeeds = this.needService.getSelectedNeed();

    } else {
      this.selectedButtons.add(need.name);
      this.needService.addNeed(need);
      this.selectedNeeds = this.needService.getSelectedNeed();
    }
  }

  ngOnInit(): void {
    this.needService.getAllNeeds().subscribe(data => {
      //in local storage save
      localStorage.setItem('needs', JSON.stringify(data));
      this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
    });

  }

}


