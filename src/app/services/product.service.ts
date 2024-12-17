import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // Получаване на всички продукти
  getProducts(): Observable<Product[]> { 
    const productsCollection = collection(this.firestore, 'products'); 
    return from(getDocs(productsCollection)).pipe( 
      map(snapshot => { 
        console.log('Snapshot:', snapshot);
        return snapshot.docs.map(doc => {  
      const data = doc.data() as { name: string, price: number, description: string }; 
      return { 
        id: doc.id, 
        name: data.name, 
        price: data.price, 
        description: data.description 
      } as Product;
    });
  })
  );
  }

  // Получаване на продукт по ID
  getProductById(id: string): Observable<Product> {
    const productRef = doc(this.firestore, 'products', id);
    return from(getDoc(productRef)).pipe(
      map(doc => {
        const data = doc.data() as { name: string, price: number, description: string };
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          description: data.description
        } as Product;
      })
    );
  }

  // Получаване на продукти на текущия потребител
  getMyProducts(): Observable<Product[]> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return new Observable(observer => {
        observer.error('User not logged in');
        observer.complete();
      });
    }

    const productsRef = collection(this.firestore, 'products');
    const q = query(productsRef, where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data() as { name: string, price: number, description: string };
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          description: data.description
        } as Product;
      }))
    );
  }

  // Добавяне на нов продукт
  addProduct(product: Product): Observable<Product> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return new Observable(observer => {
        observer.error('User not logged in');
        observer.complete();
      });
    }
  
    const newProduct = { ...product, userId };
    return from(addDoc(collection(this.firestore, 'products'), newProduct)).pipe(
      map(docRef => ({
        ...newProduct,
        id: docRef.id
      }))
    );
  }

  // Актуализиране на продукт
  updateProduct(id: string, product: Product): Observable<void> {
    const productRef = doc(this.firestore, 'products', id);
    return from(updateDoc(productRef, product));
  }

  // Изтриване на продукт
  deleteProduct(id: string): Observable<void> {
    const productRef = doc(this.firestore, 'products', id);
    return from(deleteDoc(productRef));
  }

  // Получаване на любими продукти на даден потребител
  getFavourites(): Observable<Product[]> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return new Observable(observer => {
        observer.error('User not logged in');
        observer.complete();
      });
    }

    const favouritesRef = collection(this.firestore, 'favourites');
    const q = query(favouritesRef, where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data() as { name: string, price: number, description: string };
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          description: data.description
        } as Product;
      }))
    );
  }

  // Добавяне на продукт в любими
  addFavourite(productId: string): Observable<string> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return new Observable(observer => {
        observer.error('User not logged in');
        observer.complete();
      });
    }

    return from(addDoc(collection(this.firestore, 'favourites'), { userId, productId })).pipe(
      map(docRef => docRef.id)
    );
  }

  // Премахване на продукт от любими
  removeFavourite(productId: string): Observable<void> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return new Observable(observer => {
        observer.error('User not logged in');
        observer.complete();
      });
    }

    const q = query(collection(this.firestore, 'favourites'), where('userId', '==', userId), where('productId', '==', productId));
    return from(getDocs(q)).pipe(
      map(snapshot => {
        snapshot.docs.forEach(doc => deleteDoc(doc.ref));
      })
    );
  }
}
