import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone:true,
    imports: [
        RouterOutlet,
        NavbarComponent,
        CommonModule
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'produting';
  isLoggedIn: boolean =false;

  constructor(private authService: AuthService) {
    // Проверка на текущия потребител
    this.authService.checkAuthStatus();
   
  }
    ngOnInit() {
    // Проверка дали потребителят е логнат
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
}