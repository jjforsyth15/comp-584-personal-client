import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { Order } from './order/order';
import { Restaurant } from './restaurant/restaurant';
import { Login } from './auth/login';
import { Register } from './register/register';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'menu', component: Menu },
    { path: 'restaurant', component: Restaurant },
    { path: 'order', component: Order },
    { path: 'auth/login', component: Login },
    { path: 'register', component: Register},
    { path: 'restaurant-menu/:id', component: Menu}
];
