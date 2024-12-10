// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable(); // Observable за статус на логване
  private auth = getAuth();

  constructor() {
    this.checkFirebaseConnection(); // Проверка на състоянието на логване при инициализация
  }

  // Метод за проверка на състоянието на логване
  checkAuthStatus(): void {
    this.checkFirebaseConnection();
  }

  // Метод за вход
  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log('User signed in:', userCredential.user);
        this.loggedIn.next(true);
      })
      .catch(error => {
        console.error('Login failed:', error.message);
        throw error.message;
      });
  }

  // Метод за регистрация
  register(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log('User registered:', userCredential.user);
        this.loggedIn.next(true);
      })
      .catch(error => {
        console.error('Registration failed:', error.message);
        throw error.message;
      });
  }

  // Метод за изход
  logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        this.loggedIn.next(false); // Променя статус на изход
      })
      .catch(error => {
        console.error('Logout failed:', error.message);
        throw error.message;
      });
  }

  // Проверка на свързаност с Firebase
  private checkFirebaseConnection() {
    onAuthStateChanged(this.auth, user => {
      this.loggedIn.next(!!user); // Ако има активен потребител, задаваме loggedIn на true
    }, error => {
      console.error('Error while checking auth state:', error);
      this.loggedIn.next(false); // Ако няма потребител, задаваме loggedIn на false
    });
  }

  // Метод за извличане на ID на логнатия потребител
  getCurrentUserId(): string | null {
    const user: User | null = this.auth.currentUser;
    return user ? user.uid : null; // Връща ID на потребителя или null
  }
}
