import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private auth: Auth, private db: Firestore) { // Инжектирайте Auth и Firestore!
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.isLoggedInSubject.next(!!user);
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.isLoggedInSubject.next(true);
    } catch (error: unknown) {
      this.handleAuthError(error);
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.isLoggedInSubject.next(true);
    } catch (error: unknown) {
      this.handleAuthError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.isLoggedInSubject.next(false);
    } catch (error: unknown) {
      this.handleAuthError(error);
    }
  }

  getCurrentUserId(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }

    getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  async checkFirestoreConnection(): Promise<boolean> {
    try {
      const snapshot = await getDocs(collection(this.db, 'products'));
      return snapshot.empty === false;
    } catch (error) {
      console.error('Error checking Firestore connection:', error);
      return false;
    }
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  private handleAuthError(error: unknown): void {
    if (error instanceof Error) {
      throw new Error(error.message || 'Authentication failed');
    }
    throw new Error('An unknown error occurred during authentication');
  }
}