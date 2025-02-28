import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-home-screen',
  templateUrl: './customer-home-screen.component.html',
  styleUrls: ['./customer-home-screen.component.css']
})
export class CustomerHomeScreenComponent implements OnInit {
  userId: string | null = null;
  user: any = {};
  query: string = '';
  results: any[] = [];
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');

    // Get state data if available
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.user = navigation.extras.state['user'] || {};
    }
  }

  handleSearch(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.error = ''; // Clear previous errors
      const url = `http://localhost:8081/api/customers/search?query=${encodeURIComponent(this.query)}&latitude=26.692284424260034&longitude=88.3774020141318`;

      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          this.results = data;
          console.log('Result received:', data);
        },
        error: (err) => {
          this.error = 'Failed to fetch data';
        }
      });
    }
  }

  handleRestaurantClick(restaurant: any): void {
    console.log('Menu item clicked');
    this.router.navigate(['/restaurantMenu'], { state: { restaurant } });
  }
}
