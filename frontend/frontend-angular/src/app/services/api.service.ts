import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// All auth-related HTTP calls — base URL is sourced from environment to support dev/prod switching
const BASE_URL = `${environment.apiUrl}/auth`;

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // Sends login credentials; cookies are set by the backend response, not handled here
  login(userType: string, credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${BASE_URL}/${userType}/login`, credentials, { withCredentials: true });
  }

  // Sends signup form data and returns the created user profile (no password in response)
  signup(userType: string, userDetails: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${userType}/signup`, userDetails);
  }
}
