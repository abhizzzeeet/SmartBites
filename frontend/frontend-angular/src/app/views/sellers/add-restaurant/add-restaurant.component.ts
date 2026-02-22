import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Restaurant } from '../../../models/restaurant.model';

@Component({
  selector: 'app-add-restaurant',
  imports: [FormsModule],
  templateUrl: './add-restaurant.component.html'
})
export class AddRestaurantComponent {
  formData = {
    restaurantName: '',
    address: '',
    city: '',
    state: '',
    latitude: '',
    longitude: '',
    pincode: ''
  };

  constructor(private userService: UserService) {}

  handleSubmit(): void {
    const user = this.userService.getUser();
    if (!user) return;

    const newRestaurant = new Restaurant(
      null,
      this.formData.restaurantName,
      this.formData.address,
      this.formData.city,
      this.formData.state,
      this.formData.latitude,
      this.formData.longitude,
      this.formData.pincode,
      user.id
    );

    fetch('http://localhost:8081/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRestaurant)
    })
      .then((response) => {
        if (response.ok) {
          alert('Restaurant added successfully!');
          this.formData = {
            restaurantName: '',
            address: '',
            city: '',
            state: '',
            latitude: '',
            longitude: '',
            pincode: ''
          };
        } else {
          alert('Failed to add restaurant.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  }
}
