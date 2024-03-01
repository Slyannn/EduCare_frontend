import {Component, OnInit} from '@angular/core';
import {NeedService} from "../../services/need.service";
import {Need} from "../../models/need";

@Component({
  selector: 'app-explor',
  templateUrl: './explor.component.html',
  styleUrls: ['./explor.component.css']
})
export class ExplorComponent implements OnInit{
  needs!: Need[];
  selectedButtons: Set<string> = new Set();

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
    } else {
      this.selectedButtons.add(need.name);
      this.needService.addNeed(need);
    }
  }
  getAll():Need[]{
    return this.needService.getNeedList();
  }

  ngOnInit(): void {
    this.needService.getAllNeeds().subscribe(data => {
      //in local storage save
      localStorage.setItem('needs', JSON.stringify(data));
      this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
    });
  }



}
