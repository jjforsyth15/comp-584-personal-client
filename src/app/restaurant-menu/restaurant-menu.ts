import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItemData } from '../menu/menu-item-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantData } from '../restaurant/restaurant-data';

@Component({
  selector: 'app-restaurant-menu',
  imports: [],
  templateUrl: './restaurant-menu.html',
  styleUrl: './restaurant-menu.css',
})
export class RestaurantMenu implements OnInit{

  restaurant!: RestaurantData

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, 
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    let idparam  = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.http.get<RestaurantData>
    (`${environment.apiUrl}/api/Restaurants/${idparam}`).subscribe(result => {
      this.restaurant = result;
      this.changeDetector.detectChanges();
    });
  }
}
