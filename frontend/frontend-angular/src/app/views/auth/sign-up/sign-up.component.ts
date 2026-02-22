import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  @Input() userType: string = '';
  formData = { name: '', email: '', password: '', phone: '' };

  constructor(private apiService: ApiService) {}

  handleSubmit(): void {
    this.apiService.signup(this.userType, this.formData).subscribe({
      next: (user) => alert(`Signup successful for user: ${user.name}`),
      error: (err) =>
        alert(`Signup failed: ${err.error?.message || err.message}`)
    });
  }
}
