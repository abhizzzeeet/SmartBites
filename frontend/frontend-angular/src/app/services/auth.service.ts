import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

const AUTH_URL = `${environment.apiUrl}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  // Sends credentials to the backend; on success the backend sets httpOnly cookies and returns the user profile
  login(userType: string, credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${AUTH_URL}/${userType}/login`, credentials, { withCredentials: true }).pipe(
      tap(user => this.userService.setUser(user))
    );
  }

  // Calls the backend logout endpoint to revoke the refresh token, then clears local user state
  logout(): Observable<void> {
    return this.http.post<void>(`${AUTH_URL}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.userService.clearUser();
        this.router.navigate(['/auth/customer']);
      }),
      catchError(() => {
        // Always clear local state even if the backend call fails
        this.userService.clearUser();
        this.router.navigate(['/auth/customer']);
        return of(undefined);
      })
    );
  }

  // Asks the backend to issue a new access token cookie using the existing httpOnly refresh token cookie
  refreshToken(): Observable<void> {
    return this.http.post<void>(`${AUTH_URL}/refresh`, {}, { withCredentials: true });
  }

  // Calls /auth/me to verify the cookie-based session and restore the user profile after a page refresh
  restoreSession(): Observable<User | null> {
    return this.http.get<User>(`${AUTH_URL}/me`, { withCredentials: true }).pipe(
      tap(user => this.userService.setUser(user)),
      catchError(() => {
        this.userService.clearUser();
        return of(null);
      })
    );
  }

  // Returns true if a user is currently stored in memory (i.e. a session is active)
  isAuthenticated(): boolean {
    return !!this.userService.getUser();
  }

  // Returns the userType of the currently logged-in user, or undefined if not authenticated
  getUserType(): string | undefined {
    return this.userService.getUser()?.userType;
  }
}
