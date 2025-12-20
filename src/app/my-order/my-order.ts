import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItem, OrderRequest } from '../order/order-data';
import { sharedOrder } from '../order/order-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-my-order',
  imports: [CommonModule],
  templateUrl: './my-order.html',
  styleUrl: './my-order.css',
})
export class MyOrder {

  constructor(private http: HttpClient) { }

  orderItems: OrderItem[] = sharedOrder;

  getTotal(): number {
    return this.orderItems.reduce((total, item) => total + (item.price), 0);
  }

  buildOrder(): OrderRequest {
    return {
      items: this.orderItems.map(item => ({
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
    }))
    };
  }

  submitOrder() {
    const orderRequest = this.buildOrder();
    
    this.http.post(environment.apiUrl + '/api/Order', orderRequest).subscribe({
      next: response => {
        console.log('Order submitted successfully:', response);
        this.orderItems = [];
      },
      error: error => {
        console.error('Error submitting order:', error);
      }
    });
  }
}
