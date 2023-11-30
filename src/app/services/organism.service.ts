import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Organism} from "../models/organism";
import {Observable} from "rxjs";
import baseUrl from "./baseUrl";

@Injectable({
  providedIn: 'root'
})
export class OrganismService {

  constructor(private httpClient: HttpClient) { }

  //Post signup a new organism from class model/organism
  signup(organism: Organism):Observable<Organism>  {
    return this.httpClient.post<Organism>(`${baseUrl}/api/organism/signup`, organism);
  }



}
