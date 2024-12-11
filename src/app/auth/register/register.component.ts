import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onInput(event: Event, type: 'name' | 'email' | 'password' | 'confirmPassword'): void {
    const target = event.target as HTMLInputElement;
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
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    // Проверка на всички полета
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

    // Проверка за съществуващ потребител преди регистрация
    this.authService.checkUserExists(this.email)
      .then((exists) => {
        if (exists) {
          this.errorMessage = 'User already exists. Please login.';
        } else {
          // Регистрация на нов потребител
          this.authService.register(this.email, this.password)
            .then(() => {
              this.successMessage = 'Registration successful! You can now log in.';
              this.clearForm();
            })
            .catch((error: any) => {
              this.errorMessage = error.message || 'Registration failed!';
            });
        }
      })
      .catch((error) => {
        this.errorMessage = error.message || 'Error checking user existence.';
      });
  }

  clearForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
