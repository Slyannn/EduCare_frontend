import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Need} from "../models/need";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import baseUrl from "./baseUrl";
import {OrganismAdmin} from "../models/organismAdmin";

@Injectable({
  providedIn: 'root'
})
export class NeedService {

  //List of needs selected and saved in local storage
  //organismAdminSelected must be reactiv
  organismAdminSelected: BehaviorSubject<Need[]> = new BehaviorSubject<Need[]>([]);


  constructor( private httpClient :HttpClient) { }

  //get all needs
  getAllNeeds(): Observable<Need[]>{
    return this.httpClient.get<Need[]>(`${baseUrl}/api/needs/`);
  }

  //get one need
  getOneNeed(id: number): Observable<Need>{
    return this.httpClient.get<Need>(`${baseUrl}/api/needs/${id}`);
  }
  getNeedList() :Need[]{
    return this.organismAdminSelected.getValue();
  }
  //add a new need in the list of needs selected
  addNeed(need: Need): void {
    // Add the need to the list of needs selected if it doesn't already exist
    const currentList = this.organismAdminSelected.getValue();

    if (!currentList.some(item => item.id === need.id)) {
      const updatedList = [...currentList, need];
      this.organismAdminSelected.next(updatedList);
      localStorage.setItem('selectedNeeds', JSON.stringify(updatedList));

    }
  }

  removeNeed(need: Need): void {
    // Remove the need from the list of needs selected
    const currentList = this.organismAdminSelected.getValue();
    const updatedList = currentList.filter(service =>service.id !== need.id);

    this.organismAdminSelected.next(updatedList);
    localStorage.setItem('selectedNeeds', JSON.stringify(updatedList));
  }




}
