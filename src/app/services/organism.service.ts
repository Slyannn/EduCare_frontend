import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Organism} from "../models/organism";
import {Observable, Subject} from "rxjs";
import baseUrl from "./baseUrl";
import {OrganismAdmin} from "../models/organismAdmin";
import {Need} from "../models/need";

@Injectable({
  providedIn: 'root'
})
export class OrganismService {

  constructor(private httpClient: HttpClient) {
  }

  //Post signup a new organism from class model/organism
  signup(organism: FormData): Observable<any> {
    return this.httpClient.post(`${baseUrl}/api/organism/signup`, organism);
  }

  //Get all organisms
  getAllOrganisms(): Observable<OrganismAdmin[]> {
    return this.httpClient.get<OrganismAdmin[]>(`${baseUrl}/api/organism/all`);
  }

  getFilteredOrganisms(needs: Need[]): Observable<any> {
    const payload = {services: needs};
    return this.httpClient.post(`${baseUrl}/api/organism/filter`, payload);
  }

  public filterOrganism(selectedNeeds: Need[]): OrganismAdmin[] {
    return this.getOrganismsFromLocalStorage().filter(organism => {
      return organism.services.some(service => selectedNeeds.some(need => need.id === service.id));
    });
  }

  //save filteredOganisms im LocalStorage
  saveOrganisms(filteredOrganisms: OrganismAdmin[]) {
    localStorage.setItem('organismResult', JSON.stringify(filteredOrganisms));
  }

  getOrganismsFromLocalStorage(): OrganismAdmin[] {
    return localStorage.getItem('organismResult') ? JSON.parse(localStorage.getItem('organismResult') || '{}') : [];
  }




}
