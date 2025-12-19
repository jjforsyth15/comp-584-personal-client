import { Component, OnInit } from '@angular/core';
import { MenuItemData } from '../menu/menu-item-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantData } from '../restaurant/restaurant-data';

@Component({
  selector: 'app-restaurant-menu',
  imports: [RouterLink],
  templateUrl: './restaurant-menu.html',
  styleUrl: './restaurant-menu.css',
})
export class Menu implements OnInit{

  restaurant!: RestaurantData

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let idparam  = this.activateRoute.snapshot.paramMap.get('id');
    this.http.get<RestaurantData>
    (`${environment.apiUrl}/api/Restaurants/${idparam}`).subscribe(result => {
      this.restaurant = result;
    });
  }
}
