import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
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
  isLoggedIn$: Observable<boolean>; // Дефинираме isLoggedIn$ като Observable

  constructor(private authService: AuthService) {
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
      })
      .catch((error: string) => {
        this.errorMessage = error; // Показваме съобщението за грешка
      });
  }

  clearForm() {
    this.email = '';
    this.password = '';
  }
}
