import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import baseUrl from "./baseUrl";
import {Student} from "../models/student";
import {Need} from "../models/need";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  localStorageKey: string = 'selectedProfileNeeds';
  constructor(private httpClient: HttpClient) { }

  //Post signup a new organism from class model/organism
  signup(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${baseUrl}/api/student/signup`, student);
  }

  addNeed(id:number, need: any): Observable<any>{
    const payload: any = {need: need};
    return this.httpClient.post(`${baseUrl}/api/student/${id}/need`, payload);
  }

  removeNeed(studentId: number, needId: number): Observable<any>{
    return this.httpClient.delete(`${baseUrl}/api/student/${studentId}/need/${needId}`);
  }

  saveNeedLocalStorage(need: any){
    localStorage.setItem(this.localStorageKey, JSON.stringify(need));
  }

  getNeedData(): [] {
    return localStorage.getItem(this.localStorageKey) ? JSON.parse(localStorage.getItem(this.localStorageKey) || '{}') : [];
  }

  updateLocalStorageData(updatedData: any): void {
    const existingData = localStorage.getItem(this.localStorageKey);

    let newData;
    if (existingData) {
      newData = JSON.parse(existingData);
      newData = updatedData;
      //newData = [...newData, ...updatedData];
    } else {
      newData = updatedData;
    }

    // Step 3: Store the updated data back in localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(newData));
  }

}
