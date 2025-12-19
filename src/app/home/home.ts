import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { AuthService } from '../auth/auth-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  isLoggedIn!: boolean;

  constructor(public authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

}
