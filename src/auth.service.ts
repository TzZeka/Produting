import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  private auth = getAuth(); // Инициализиране на Firebase Authentication

  constructor() {
    // Проверка на текущото състояние на свързаност
    this.checkFirebaseConnection();
  }

  // Метод за вход
  login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Успешно влизане
          const user = userCredential.user;
          console.log('User signed in:', user);
          this.loggedIn.next(true); // Настройваме на истинско
          resolve();
        })
        .catch((error) => {
          console.error('Login failed:', error.message);
          reject(error.message); // Връщаме грешка
        });
    });
  }

  // Метод за регистрация
  register(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Успешна регистрация
          const user = userCredential.user;
          console.log('User registered:', user);
          this.loggedIn.next(true); // Настройваме на истинско
          resolve();
        })
        .catch((error) => {
          console.error('Registration failed:', error.message);
          reject(error.message); // Връщаме грешка
        });
    });
  }

  // Метод за изход
  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      signOut(this.auth)
        .then(() => {
          this.loggedIn.next(false); // Настройваме на лъжливо
          resolve();
        })
        .catch((error) => {
          console.error('Logout failed:', error.message);
          reject(error.message);
        });
    });
  }

  // Метод за проверка на свързаност с Firebase
  private checkFirebaseConnection() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        this.loggedIn.next(true); // Потребителят е влязъл
      } else {
        console.log('No user is signed in.');
        this.loggedIn.next(false); // Потребителят не е влязъл
      }
    }, (error) => {
      console.error('Error while checking auth state:', error);
      this.loggedIn.next(false); // Настройваме на лъжливо, ако има грешка
    });
  }

  checkAuthStatus(): boolean {
    return this.loggedIn.value; // Връща текущия статус на удостоверяване
  }
}