import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

// Типизация на обектите
interface UserError extends Error {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private auth = getAuth();  // Използваме auth от Firebase v9+
  private db = getFirestore();  // За Firestore

  constructor() {
    // Проверка на състоянието на логнатия потребител при стартиране на приложението
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.isLoggedInSubject.next(!!user);
    });
  }

  // Логин метод
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.isLoggedInSubject.next(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Login failed');
      }
      throw new Error('An unknown error occurred during login');
    }
  }

  // Регистрация на нов потребител
  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.isLoggedInSubject.next(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Registration failed');
      }
      throw new Error('An unknown error occurred during registration');
    }
  }

  // Проверка за съществуващ потребител
  async checkUserExists(email: string): Promise<boolean> {
    const usersQuery = query(collection(this.db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(usersQuery);
    return !querySnapshot.empty; // Ако има потребител с такъв имейл, връща true
  }

  // Логаут метод
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.isLoggedInSubject.next(false); // Актуализиране на състоянието на логнатия потребител
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Logout failed');
      }
      throw new Error('An unknown error occurred during logout');
    }
  }

  // Метод за получаване на текущия потребител (ако е логнат)
  getCurrentUserId(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null; // Връща ID на потребителя или null ако не е логнат
  }
}
