import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Organism} from "../models/organism";
import {Observable} from "rxjs";
import baseUrl from "./baseUrl";
import {OrganismAdmin} from "../models/organismAdmin";
import {Need} from "../models/need";

@Injectable({
  providedIn: 'root'
})
export class OrganismService {

  constructor(private httpClient: HttpClient) { }

  //Post signup a new organism from class model/organism
  signup(organism: FormData): Observable<any> {
    return this.httpClient.post(`${baseUrl}/api/organism/signup`, organism);
  }

  //Get all organisms
  getAllOrganisms(): Observable<OrganismAdmin[]> {
    return this.httpClient.get<OrganismAdmin[]>(`${baseUrl}/api/organism/all`);
  }
  //Get OrganismById
  getOrganismByID(id:number):Observable<OrganismAdmin>{
    return this.httpClient.get<OrganismAdmin>(`${baseUrl}/api/organism/${id}`)
  }

  getFilteredOrganisms(needs: Need[]): Observable<any> {
    const payload = { services: needs };
    return this.httpClient.post(`${baseUrl}/api/organism/filter`, payload);
  }



}
