import {Component, OnInit} from '@angular/core';
import {OrganismService} from "../../../services/organism.service";
import {NeedService} from "../../../services/need.service";
import {Need} from "../../../models/Need";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  public needs!: Need[];

  constructor(private organismService: OrganismService,
              private needService: NeedService) {}

  ngOnInit(): void {
    this.needService.getAllNeeds().subscribe(data => {
      this.needs = data;
      console.log(this.needs);
    })

  }




}
