import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderData } from '../order/order-data';
import { catchError } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [AsyncPipe],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css',
})
export class AllOrders {
  
  orders$!: Observable<OrderData[]>;

  constructor(private http: HttpClient) {
    this.orders$ = this.getAllOrders().pipe(
    catchError(error => {
    console.error('Error fetching orders:', error);
    return of([] as OrderData[]);
  })
);
  }

  getAllOrders(): Observable<OrderData[]> {
    return this.http.get<OrderData[]>(environment.apiUrl + "/api/Order");
  }
}
