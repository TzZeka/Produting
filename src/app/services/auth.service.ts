import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, Firestore } from 'firebase/firestore';  // Импортиране на Firestore

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private auth = getAuth(); 
  private db: Firestore;  // Добавяне на db като инстанция на Firestore

  constructor() {
    this.db = getFirestore();  // Инициализиране на Firestore

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

  // Метод за получаване на текущия потребител (със подробности)
  getCurrentUser(): User | null {
    return this.auth.currentUser;  // Връща обекта User, ако има логнат потребител, или null ако не е логнат
  }

  // Проверка за връзка с Firestore
  async checkFirestoreConnection(): Promise<boolean> {
    try {
      // Пример за проверка на данни в Firestore
      const snapshot = await getDocs(collection(this.db, 'products'));  // Достъп до колекция "products"
      return snapshot.empty === false; // Връща true, ако има продукти в базата
    } catch (error) {
      console.error('Error checking Firestore connection:', error);
      return false;  // Връща false, ако има грешка при свързването
    }
  }

  // Проверка дали потребител е логнат (чрез BehaviorSubject)
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue(); // Връща true или false в зависимост от състоянието на логнатия потребител
  }
}
