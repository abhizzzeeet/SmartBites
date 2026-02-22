import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

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
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  handleSubmit(): void {
    this.apiService
      .login(this.userType, { email: this.email, password: this.password })
      .subscribe({
        next: (data) => {
          const user = new User(
            data.id,
            data.name,
            data.email,
            data.password,
            data.userType,
            data.createdAt
          );
          if (user.userType !== this.userType) {
            alert(
              `You logged into a ${user.userType} account on the ${this.userType} login screen`
            );
            return;
          }
          this.userService.setUser(user);
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
