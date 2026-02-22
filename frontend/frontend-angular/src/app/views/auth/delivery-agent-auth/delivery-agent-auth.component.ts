import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-delivery-agent-auth',
  imports: [LoginComponent, SignUpComponent],
  templateUrl: './delivery-agent-auth.component.html'
})
export class DeliveryAgentAuthComponent {
  isLogin: boolean = true;

  toggleAuthMode(): void {
    this.isLogin = !this.isLogin;
  }
}
