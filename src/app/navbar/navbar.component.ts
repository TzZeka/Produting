// navbar.component.ts
import { Component } from '@angular/core';
import { Router,RouterLink,RouterLinkActive} from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>; // Източник на статус на логване

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$; // Свързване с AuthService
  }

  async logout() {
    try {
      await this.authService.logout();
      console.log('User logged out successfully.');
      await this.router.navigate(['/']); // Пренасочване след изход
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }
}