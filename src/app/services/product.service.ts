import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  // Получаване на всички продукти
  getProducts(): Observable<any[]> {
    const productRef = collection(this.firestore, 'products');
    return from(getDocs(productRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }

  // Добавяне на нов продукт
  addProduct(product: any): Observable<string> {
    const productRef = collection(this.firestore, 'products');
    return from(addDoc(productRef, product)).pipe(
      map(docRef => docRef.id)
    );
  }

  // Актуализиране на продукт
  updateProduct(id: string, product: any): Observable<void> {
    const productRef = doc(this.firestore, 'products', id);
    return from(updateDoc(productRef, product));
  }

  // Изтриване на продукт
  deleteProduct(id: string): Observable<void> {
    const productRef = doc(this.firestore, 'products', id);
    return from(deleteDoc(productRef));
  }

  // Получаване на любими продукти на даден потребител
  getFavourites(userId: string): Observable<any[]> {
    const favouritesRef = collection(this.firestore, 'favourites');
    const q = query(favouritesRef, where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }

  // Добавяне на продукт в любими
  addFavourite(userId: string, productId: string): Observable<string> {
    const favouritesRef = collection(this.firestore, 'favourites');
    return from(addDoc(favouritesRef, { userId, productId })).pipe(
      map(docRef => docRef.id)
    );
  }

  // Премахване на продукт от любими
  removeFavourite(userId: string, productId: string): Observable<void> {
    const favouritesRef = collection(this.firestore, 'favourites');
    const q = query(favouritesRef, where('userId', '==', userId), where('productId', '==', productId));
    return from(getDocs(q)).pipe(
      map(snapshot => {
        snapshot.docs.forEach(doc => {
          deleteDoc(doc.ref);
        });
      })
    );
  }
}
