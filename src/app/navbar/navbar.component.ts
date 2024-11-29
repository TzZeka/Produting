import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; 
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn$; // Свързване с AuthService
  }

  async logout() {
    try {
      await this.authService.logout();
      console.log('User logged out successfully.');
      await this.router.navigate(['/']); // Направи навигация след излизане
    } catch (error) {
      console.error('Error signing out: ', error);
      // Добавете известие за потребителя в UI, ако е необходимо
    }
  }
}