import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RestaurantData } from './restaurant-data';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-restaurant',
  imports: [ 
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
})
export class Restaurant {
  restaurant: any;
  restaurants$: Observable<RestaurantData[]>;

  constructor(private http: HttpClient) {
    this.restaurants$ = http.get<RestaurantData[]>(environment.apiUrl + '/api/Restaurants');
  }
}
