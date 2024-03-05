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
  public login(data: any): Observable<any>{
    return this.httpClient.post(`${baseUrl}/api/auth/login`, data);
  }

  public getCurrentUser(token:any): Observable<User>{

    return this.httpClient.get<User>(`${baseUrl}/api/auth/currentUser/${token}`);
  }

  public resendEmail(email: string): Observable<any>{
    return this.httpClient.get(`${baseUrl}/api/resend_verif/${email}`);
  }

  public loginUser(token:string){
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");

    return !(tokenStr == undefined || tokenStr == '' || tokenStr == null) && this.getUser().verified;
  }

  public isLoggedButNotVerified(){
    let tokenStr = localStorage.getItem("token");

    return !(tokenStr == undefined || tokenStr == '' || tokenStr == null) && !this.getUser().verified;
  }

  public logout(){
    localStorage.removeItem("user");
    localStorage.removeItem('token');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser():any{
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
    return user?.roles[0];
  }

}
