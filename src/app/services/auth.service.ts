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
  checkAuthStatus(): void {
    this.checkFirebaseConnection();
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User signed in:', userCredential.user);
      this.loggedIn.next(true); // Променя състоянието на логване
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Login failed:', error.message);
        throw error.message;
      }
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User registered:', userCredential.user);
      this.loggedIn.next(true); // Променя състоянието на логване
    } catch (error: unknown) {
      if (error instanceof Error){
      console.error('Registration failed:', error.message);
      throw error.message;
      } // Хвърляне на грешката
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.loggedIn.next(false); // Променя състоянието на логване
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Logout failed:', error.message);
        throw error.message;
      }
    }
  }

  // Проверка на свързаност с Firebase
  private checkFirebaseConnection(): void {
    onAuthStateChanged(this.auth, (user) => {
      console.log('Auth state changed: ', user);
      this.loggedIn.next(!!user); // Обновява състоянието на логването
    }, (error) => {
      console.error('Error while checking auth state:', error);
      this.loggedIn.next(false); // Ако няма потребител, задаваме loggedIn на false
    });
  }

  getCurrentUserId(): string | null {
    const user: User | null = this.auth.currentUser;
    return user ? user.uid : null;
  }
}
