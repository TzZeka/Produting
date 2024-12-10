import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoggedIn$: Observable<boolean>; 
  logoutMessage: string = '';  // 

  constructor(private authService: AuthService, private router: Router) {
    // Получаваме isLoggedIn$ от AuthService
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  // Метод за обработка на събитията от полетата за email и password
  onInput(event: Event, type: 'email' | 'password'): void {
    const target = event.target as HTMLInputElement; // Декларираме типа
    if (type === 'email') {
      this.email = target.value; // Записваме стойността на email
    } else if (type === 'password') {
      this.password = target.value; // Записваме стойността на парола
    }
  }

  // Логин метод с асинхронна обработка
  onSubmit(event: Event) {
    event.preventDefault(); // Предотвратяване на презареждане на страницата
    this.errorMessage = '';
    this.successMessage = '';
  
    // Основна проверка
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
  
    // Извикване на метода за вход от AuthService
    this.authService.login(this.email, this.password)
      .then(() => {
        this.successMessage = 'Logged in successfully!';
        this.clearForm(); // Изчистваме формата
        this.router.navigate(['/home']);  // Редирект към началната страница
      })
      .catch((error: string) => {
        this.errorMessage = error; // Показваме съобщението за грешка
      });
  }
  

  // Метод за логаут
  async onLogout(): Promise<void> {
    try {
      await this.authService.logout();
      this.successMessage = 'Successfully logged out!';
      setTimeout(() => {
        this.successMessage = ''; // Изчистване на съобщението след 3 секунди
      }, 3000);
      
      // След логаут пренасочване към страницата за логин
      await this.router.navigate(['/login']);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage = 'Error during logout: ' + error.message;
      } else {
        this.errorMessage = 'An unknown error occurred during logout.';
      }
    }
  }

  // Метод за изчистване на формата
  clearForm(): void {
    this.email = '';
    this.password = '';
  }
}