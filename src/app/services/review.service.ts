import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Review} from "../models/review";
import {Observable} from "rxjs";
import baseUrl from "./baseUrl";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  public postReview(review: Review): Observable<any>{
    return this.httpClient.post(`${baseUrl}/api/reviews/add`, review);
  }

  public reviews(): Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${baseUrl}/api/reviews/`);
  }
}
