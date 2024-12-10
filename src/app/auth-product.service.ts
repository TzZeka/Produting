import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthProductService {
  private db: Firestore;

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.db = firestore;
  }

  // Получаване на всички продукти
  getProducts(): Observable<any[]> {
    const productRef = collection(this.db, 'products');
    return from(getDocs(productRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }

  // Получаване на продуктите на конкретен потребител
  getMyProducts(): Observable<any[]> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return new Observable();

    const productRef = collection(this.db, 'products');
    const q = query(productRef, where('userId', '==', userId)); // Филтрираме по userId

    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }

  // Добавяне на нов продукт
  addProduct(product: any): Observable<string> {
    const productRef = collection(this.db, 'products');
    return from(addDoc(productRef, { ...product, userId: this.authService.getCurrentUserId() })).pipe(
      map(docRef => docRef.id)
    );
  }

  // Актуализиране на продукт
  updateProduct(id: string, product: any): Observable<void> {
    const productRef = doc(this.db, 'products', id);
    return from(updateDoc(productRef, product));
  }

  // Изтриване на продукт
  deleteProduct(id: string): Observable<void> {
    const productRef = doc(this.db, 'products', id);
    return from(deleteDoc(productRef));
  }

  // Получаване на любими продукти на даден потребител
  getFavourites(): Observable<any[]> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return new Observable();

    const favouritesRef = collection(this.db, 'favourites');
    const q = query(favouritesRef, where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }

  // Добавяне на продукт в любими
  addFavourite(productId: string): Observable<string> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return new Observable();

    const favouritesRef = collection(this.db, 'favourites');
    return from(addDoc(favouritesRef, { userId, productId })).pipe(
      map(docRef => docRef.id)
    );
  }

  // Премахване на продукт от любими
  removeFavourite(productId: string): Observable<void> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return new Observable();

    const favouritesRef = collection(this.db, 'favourites');
    const q = query(favouritesRef, where('userId', '==', userId), where('productId', '==', productId));
    return from(getDocs(q)).pipe(
      map(snapshot => {
        snapshot.docs.forEach(doc => deleteDoc(doc.ref));
      })
    );
  }
}
