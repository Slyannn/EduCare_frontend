import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import baseUrl from "./baseUrl";
import {Student} from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  //Post signup a new organism from class model/organism
  signup(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${baseUrl}/api/student/signup`, student);
  }
}
