import { Component } from '@angular/core';
import { AuthService } from '../../auth.service'; // Уверете се, че пътят до AuthService е правилен
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule,CommonModule], // Добавете FormsModule за двустранно свързване
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(event: Event) {
    event.preventDefault(); // Предотвратяване на презареждане на страницата
    this.errorMessage = '';
    this.successMessage = '';

    // Основни проверки
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Извикване на метода за регистрация от AuthService
    this.authService.register(this.email, this.password)
      .then(() => {
        this.successMessage = 'Registration successful! You can now log in.';
        this.clearForm(); // Изчистване на формата
      })
      .catch((error: string) => {
        this.errorMessage = error; // Показване на съобщение за грешка
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