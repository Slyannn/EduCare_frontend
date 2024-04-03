import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Need} from "../../../models/need";
import {OrganismAdmin} from "../../../models/organismAdmin";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {StudentService} from "../../../services/student.service";
import {OrganismService} from "../../../services/organism.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {User} from "../../../models/user";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LoginService} from "../../../services/login.service";


@Component({
  selector: 'app-student-needs',
  templateUrl: './student-needs.component.html',
  styleUrls: ['./student-needs.component.css']
})
export class StudentNeedsComponent implements OnInit{
  user!: User;
  needs!: Need [];
  organisms!: OrganismAdmin[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedNeeds!: Need[];
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
    this.user = this.login.getUser();
    this.selectedNeeds = this.needNames.map(data => this._getNeed(data));
    this.organisms = this.organismService.filterOrganism(this.selectedNeeds);
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


