import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @Input() userType: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Delegates to AuthService which handles the API call, cookie setting, and user state storage
  handleSubmit(): void {
    this.authService.login(this.userType, { email: this.email, password: this.password }).subscribe({
      next: (user) => {
        if (user.userType !== this.userType) {
          alert(`You logged into a ${user.userType} account on the ${this.userType} login screen`);
          return;
        }
        if (user.userType === 'SELLER')
          this.router.navigate([`/sellerHomeScreen/${user.id}`]);
        else if (user.userType === 'CUSTOMER')
          this.router.navigate([`/customerHomeScreen/${user.id}`]);
        else if (user.userType === 'DELIVERYAGENT')
          this.router.navigate([`/deliveryAgentHomeScreen/${user.id}`]);
        alert(`Login successful for user: ${user.name}`);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed');
      }
    });
  }
}
