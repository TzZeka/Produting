import { Component } from '@angular/core';
import { AuthService } from '../../auth.service'; // Уверете се, че пътят до AuthService е правилен
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {} // Създаване на AuthService инстанция

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

  // Метод за обработка на входа за имейл и парола
  onInput(event: Event, type: 'email' | 'password') {
    const target = event.target as HTMLInputElement; // Декларация на типа
    if (type === 'email') {
      this.email = target.value;
    } else if (type === 'password') {
      this.password = target.value;
    }
  }
}