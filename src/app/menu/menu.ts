import { Component, OnInit } from '@angular/core';
import { MenuItemData } from './menu-item-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantData } from '../restaurant/restaurant-data';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu{

  menuItems$: Observable<MenuItemData[]>;

  constructor(private http: HttpClient) {
    this.menuItems$ = 
    http.get<MenuItemData[]>(environment.apiUrl + '/api/MenuItem');
   }

}
