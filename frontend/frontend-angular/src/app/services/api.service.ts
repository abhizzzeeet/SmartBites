import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/v1/auth';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  login(userType: string, credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${BASE_URL}/${userType}/login`, credentials);
  }

  signup(userType: string, userDetails: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${userType}/signup`, userDetails);
  }
}
