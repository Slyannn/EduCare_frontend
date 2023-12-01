import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/models/organism';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit{
  data !: Organism;
  constructor(private route : ActivatedRoute) {
  }
  ngOnInit():void{
    this.route.params.subscribe(params =>{
            
      this.data = JSON.parse(decodeURIComponent(params['orga']));
    })
  }
}
