import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { getFirestore, collection, getDocs, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Състояние на логнатия потребител, използвайки BehaviorSubject за управление на логването
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();  // За проследяване на състоянието на логването

  private auth = getAuth();  // Инстанция на Firebase Authentication
  private db: Firestore;  // Инстанция на Firestore

  constructor() {
    this.db = getFirestore();  // Инициализиране на Firestore

    // Проверка на състоянието на логнатия потребител при стартиране на приложението
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.isLoggedInSubject.next(!!user);  // Актуализиране на състоянието на логнатия потребител
    });
  }

  // Логин метод, който приема имейл и парола
  async login(email: string, password: string): Promise<void> {
    try {
      // Опит за логване с имейл и парола
      await signInWithEmailAndPassword(this.auth, email, password);
      this.isLoggedInSubject.next(true);  // Поставя състоянието на логнатия потребител на true
    } catch (error: unknown) {
      this.handleAuthError(error);  // Обработка на грешка при логване
    }
  }

  // Регистрация на нов потребител
  async register(email: string, password: string): Promise<void> {
    try {
      // Опит за създаване на нов потребител
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.isLoggedInSubject.next(true);  // Поставя състоянието на логнатия потребител на true
    } catch (error: unknown) {
      this.handleAuthError(error);  // Обработка на грешка при регистрация
    }
  }

  // Логаут метод
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);  // Изход от акаунта
      this.isLoggedInSubject.next(false);  // Поставя състоянието на логнатия потребител на false
    } catch (error: unknown) {
      this.handleAuthError(error);  // Обработка на грешка при логаут
    }
  }

  // Метод за получаване на ID на текущия потребител
  getCurrentUserId(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null;  // Връща ID на потребителя или null, ако не е логнат
  }

  // Метод за получаване на текущия потребител (със всички негови данни)
  getCurrentUser(): User | null {
    return this.auth.currentUser;  // Връща обекта User или null, ако не е логнат
  }

  // Проверка за връзка с Firestore
  async checkFirestoreConnection(): Promise<boolean> {
    try {
      // Опит за извличане на документи от колекция "products"
      const snapshot = await getDocs(collection(this.db, 'products'));
      return snapshot.empty === false;  // Връща true, ако има продукти в базата
    } catch (error) {
      console.error('Error checking Firestore connection:', error);  // Логва грешката
      return false;  // Връща false, ако има грешка при свързването
    }
  }

  // Проверка дали потребителят е логнат
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();  // Връща текущото състояние на логнатия потребител
  }

  // Обработка на грешки при логване, регистрация и логаут
  private handleAuthError(error: unknown): void {
    if (error instanceof Error) {
      throw new Error(error.message || 'Authentication failed');
    }
    throw new Error('An unknown error occurred during authentication');
  }
}
