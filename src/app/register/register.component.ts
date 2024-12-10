import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule], 
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoggedIn$: Observable<boolean>; // Дефинирам isLoggedIn$ като Observable

  constructor(private authService: AuthService) {
    // Получаваме isLoggedIn$ от AuthService
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onInput(event: Event, type: 'name' | 'email' | 'password' | 'confirmPassword'): void {
    const target = event.target as HTMLInputElement; // Декларирам типа
    if (type === 'name') {
      this.name = target.value;
    } else if (type === 'email') {
      this.email = target.value;
    } else if (type === 'password') {
      this.password = target.value;
    } else if (type === 'confirmPassword') {
      this.confirmPassword = target.value;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Предотвратяване на презареждане на страницата
    this.errorMessage = '';
    this.successMessage = '';

    // Проверки на въведените данни
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    // Извикване на метода за регистрация от AuthService
    this.authService.register(this.email, this.password)
      .then(() => {
        this.successMessage = 'Registration successful! You can now log in.';
        this.clearForm(); // Изчистваме формата
      })
      .catch((error: string) => {
        this.errorMessage = error; // Показваме съобщението за грешка
        console.error('Registration failed:', error);
      });
  }

  clearForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
