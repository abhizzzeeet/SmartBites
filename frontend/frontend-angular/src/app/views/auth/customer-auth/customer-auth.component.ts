import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-auth',
  templateUrl: './customer-auth.component.html',
  styleUrls: ['./customer-auth.component.css']
})
export class CustomerAuthComponent {
  isLogin: boolean = true;

  toggleAuthMode(): void {
    this.isLogin = !this.isLogin;
  }
}
