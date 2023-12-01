import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Need} from "../models/need";
import {Observable} from "rxjs";
import baseUrl from "./baseUrl";

@Injectable({
  providedIn: 'root'
})
export class NeedService {

  constructor( private httpClient :HttpClient) { }

  //get all needs
  getAllNeeds(): Observable<Need[]>{
    return this.httpClient.get<Need[]>(`${baseUrl}/api/needs/`);
  }

  //get one need
  getOneNeed(id: number): Observable<Need>{
    return this.httpClient.get<Need>(`${baseUrl}/api/needs/${id}`);
  }

}
