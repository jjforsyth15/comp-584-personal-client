import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItemData } from '../menu/menu-item-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantData } from '../restaurant/restaurant-data';
import { OrderItem, sharedOrder } from '../order/order-data';
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

  addToOrder(item: MenuItemData) {
    const existingItem = sharedOrder.find(item => item.menuItemId === item.id);
    if (existingItem) 
      existingItem.quantity++;
    else {
      sharedOrder.push({
        id: 0,
        orderId: 0,
        menuItemId: item.id,
        quantity: 1,
        price: item.price,
        menuItem: {
          id: item.id,
          name: item.name
        }
      } as OrderItem);
      }
    }
}
