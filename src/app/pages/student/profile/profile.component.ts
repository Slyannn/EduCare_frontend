import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {User} from "../../../models/user";
import {LoginService} from "../../../services/login.service";
import {Need} from "../../../models/need";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {StudentService} from "../../../services/student.service";
import {OrganismService} from "../../../services/organism.service";
import {OrganismAdmin} from "../../../models/organismAdmin";

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent  implements OnInit {
  panelOpenState = false;
  user!: User;
  needs!: Need [];
  organisms!: OrganismAdmin[];
  selectedNeeds!: Need[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  needCtrl = new FormControl('');
  filteredNeeds!: Observable<string[]>;
  needNames: string[] = [];
  allNeeds: string [] = [];

  @ViewChild('needInput') needInput!: ElementRef<HTMLInputElement>;



  constructor(private login: LoginService,
              private studentService: StudentService,
              private organismService: OrganismService ) {

    if(localStorage.getItem('needs')){
      this.needs = localStorage.getItem('needs') ? JSON.parse(localStorage.getItem('needs') || '{}') : [];
      this.needs.forEach(
        (need) =>{
          this.allNeeds.push(need.name);
        }
      )
    }

    if(studentService.getNeedData()){
      this.needNames = studentService.getNeedData();
    }

    this.filteredNeeds = this.needCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allNeeds.slice())),
    );

  }

  ngOnInit(): void {
    this.user = this.login?.getUser();

    this.selectedNeeds = this.needNames.map(data => this._getNeed(data));
    this.organismService.getFilteredOrganisms(this.selectedNeeds).subscribe(
      (data) => this.organisms = data,
    )
  }

  private _getNeed(needName:string): Need{
    return this.needs.filter(need =>  need.name.includes(needName))[0];
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.needNames.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.needCtrl.setValue(null);
  }
  remove(need: string): void {
    const index = this.needNames.indexOf(need);

    if (index >= 0) {
      this.needNames.splice(index, 1);
    }


    this.studentService.removeNeed(this.user.student.id, this._getNeed(need).id).subscribe(
      data => this.studentService.updateLocalStorageData(this.needNames),
      err => console.log(err)
    )
    this.studentService.updateLocalStorageData(this.needNames);

    this.ngOnInit();
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.needNames.includes(event.option.viewValue)) {
      this.needNames.push(event.option.viewValue);

      this.studentService.addNeed(this.user.student.id, this._getNeed(event.option.viewValue)).subscribe(
        data => this.studentService.saveNeedLocalStorage(this.needNames),
        err => console.log(err)
      )
    }
      this.needInput.nativeElement.value = '';
      this.needCtrl.setValue(null);
      this.ngOnInit();

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allNeeds.filter(need => need.toLowerCase().includes(filterValue));
  }

}
