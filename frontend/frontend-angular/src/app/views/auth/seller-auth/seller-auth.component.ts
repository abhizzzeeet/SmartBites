import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-seller-auth',
  imports: [LoginComponent, SignUpComponent],
  templateUrl: './seller-auth.component.html'
})
export class SellerAuthComponent {
  isLogin: boolean = true;

  toggleAuthMode(): void {
    this.isLogin = !this.isLogin;
  }
}
