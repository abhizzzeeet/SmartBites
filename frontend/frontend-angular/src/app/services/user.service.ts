import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    // On startup, hydrate in-memory state from the non-sensitive cache;
    // AuthService.restoreSession() will confirm the actual session via /auth/me
    this.loadFromCache();
  }

  // Stores the user profile in memory and caches non-sensitive fields locally for UI persistence
  setUser(user: User): void {
    this.userSubject.next(user);
    const { id, name, email, userType } = user;
    localStorage.setItem('user', JSON.stringify({ id, name, email, userType }));
  }

  // Returns the current user snapshot from the in-memory BehaviorSubject
  getUser(): User | null {
    return this.userSubject.value;
  }

  // Clears both the in-memory state and the localStorage cache (called on logout)
  clearUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  // Populates in-memory state from the localStorage cache without making an API call
  loadFromCache(): void {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        this.userSubject.next(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing user from cache', e);
        localStorage.removeItem('user');
      }
    }
  }
}
