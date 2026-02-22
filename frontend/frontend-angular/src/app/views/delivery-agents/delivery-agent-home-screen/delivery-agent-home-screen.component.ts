import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-delivery-agent-home-screen',
  imports: [],
  templateUrl: './delivery-agent-home-screen.component.html'
})
export class DeliveryAgentHomeScreenComponent implements OnInit {
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
  }

  get user() {
    return this.userService.getUser();
  }
}
