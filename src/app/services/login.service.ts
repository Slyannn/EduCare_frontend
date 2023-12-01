import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baseUrl from "./baseUrl";
import {Observable, Subject} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor( private httpClient :HttpClient) { }

  //login Post baseUrl/api/auth/login
  login(data: any): Observable<any>{
    return this.httpClient.post(`${baseUrl}/api/auth/login`, data);
  }

  //localhost:8000/api/student/max@test.fr
  //get one student
  getOneUser(email: string): Observable<User>{
    return this.httpClient.get<User>(`${baseUrl}/api/auth/${email}`);
  }

  public isLoggedIn(){
    let user = localStorage.getItem("user");
    if(user == undefined || user == '' || user== null){
      return false;
    }else {
      return true;
    }
  }

  public logout(){
    localStorage.removeItem("user");
    return true;
  }

  //save user data in local storage
  saveUserData(data: any){
    localStorage.setItem('user', JSON.stringify(data));
  }

  //get user data from local storage
  getUserData(){
    return localStorage.getItem('user');
  }


  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.roles[0];
  }

}
