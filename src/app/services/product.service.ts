import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore, private authService: AuthService) {}

  // Метод за получаване на всички продукти
  getProducts(): Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    return from(getDocs(productsCollection)).pipe(
      map(snapshot => {
        console.log('Snapshot received for all products:', snapshot);
        return snapshot.docs.map(doc => {
          const data = doc.data() as { name: string, price: number, description: string };
          console.log('Document data:', data);
          return {
            id: doc.id,
            name: data.name,
            price: data.price,
            description: data.description
          } as Product;
        });
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        }
        throw error;
      })
    );
  }

  // Метод за получаване на продукт по ID
  getProductById(id: string): Observable<Product> {
    const productRef = doc(this.firestore, 'products', id);
    return from(getDoc(productRef)).pipe(
      map(doc => {
        if (doc.exists()) {
          const data = doc.data() as { name: string, price: number, description: string };
          console.log('Product data for ID:', data);
          return {
            id: doc.id,
            name: data.name,
            price: data.price,
            description: data.description
          } as Product;
        } else {
          console.log('No such product document found!');
          throw new Error('Product not found');
        }
      }),
      catchError(error => {
        console.error('Error fetching product by ID:', error);
        throw error;
      })
    );
  }

  // Метод за получаване на продуктите на текущия потребител
  getMyProducts(): Observable<Product[]> {
    const userId = this.authService.getCurrentUserId();
    console.log('Current User ID:', userId);
    if (!userId || userId.trim() === '') {
      console.error('Error: User ID is invalid or missing');
      return new Observable(observer => {
        observer.error('User not logged in or invalid user ID');
        observer.complete();
      });
    }

    console.log('Proceeding with userId for query:', userId);

    const productsRef = collection(this.firestore, 'products');
    const q = query(productsRef, where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map(snapshot => {
        console.log('Snapshot received for user products:', snapshot);
        return snapshot.docs.map(doc => {
          const data = doc.data() as { name: string, price: number, description: string };
          console.log('Product data for user:', data);
          return {
            id: doc.id,
            name: data.name,
            price: data.price,
            description: data.description
          } as Product;
        });
      }),
      catchError(error => {
        console.error('Error fetching user products:', error);
        throw error;
      })
    );
  }

  // Метод за добавяне на нов продукт
  addProduct(product: Product): Observable<Product> {
    const userId = this.authService.getCurrentUserId();
    console.log('Current User ID for addProduct:', userId);
    if (!userId || userId.trim() === '') {
      console.error('Error: User ID is invalid or missing');
      return new Observable(observer => {
        observer.error('User not logged in or invalid user ID');
        observer.complete();
      });
    }

    const newProduct = { ...product, userId };
    return from(addDoc(collection(this.firestore, 'products'), newProduct)).pipe(
      map(docRef => ({
        ...newProduct,
        id: docRef.id
      })),
      catchError(error => {
        console.error('Error adding product:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        }
        throw error;
      })
    );
  }

  // Метод за обновяване на съществуващ продукт
  updateProduct(id: string, product: Product): Observable<void> {
    const productRef = doc(this.firestore, 'products', id);
    return from(updateDoc(productRef, product)).pipe(
      catchError(error => {
        console.error('Error updating product:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        }
        throw error;
      })
    );
  }

  // Метод за изтриване на продукт
  deleteProduct(id: string): Observable<void> {
    const productRef = doc(this.firestore, 'products', id);
    return from(deleteDoc(productRef)).pipe(
      catchError(error => {
        console.error('Error deleting product:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        }
        throw error;
      })
    );
  }

  // Метод за получаване на любими продукти на текущия потребител
  getFavourites(): Observable<Product[]> {
    const userId = this.authService.getCurrentUserId();
    console.log('Current User ID for favourites:', userId);
    if (!userId || userId.trim() === '') {
      console.error('Error: User ID is invalid or missing');
      return new Observable(observer => {
        observer.error('User not logged in or invalid user ID');
        observer.complete();
      });
    }

    const favouritesRef = collection(this.firestore, 'favourites');
    const q = query(favouritesRef, where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map(snapshot => {
        console.log('Snapshot received for favourites:', snapshot);
        return snapshot.docs.map(doc => {
          const data = doc.data() as { name: string, price: number, description: string };
          console.log('Favourite product data:', data);
          return {
            id: doc.id,
            name: data.name,
            price: data.price,
            description: data.description
          } as Product;
        });
      }),
      catchError(error => {
        console.error('Error fetching favourites:', error);
        throw error;
      })
    );
  }

  // Метод за добавяне на любим продукт
  addFavourite(productId: string): Observable<string> {
    const userId = this.authService.getCurrentUserId();
    console.log('Current User ID for addFavourite:', userId);
    if (!userId || userId.trim() === '') {
      console.error('Error: User ID is invalid or missing');
      return new Observable(observer => {
        observer.error('User not logged in or invalid user ID');
        observer.complete();
      });
    }

    return from(addDoc(collection(this.firestore, 'favourites'), { userId, productId })).pipe(
      map(docRef => docRef.id),
      catchError(error => {
        console.error('Error adding favourite:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        }
        throw error;
      })
    );
  }

  // Метод за премахване на любим продукт
  removeFavourite(productId: string): Observable<void> {
    const userId = this.authService.getCurrentUserId();
    console.log('Current User ID for removeFavourite:', userId);
    if (!userId || userId.trim() === '') {
      console.error('Error: User ID is invalid or missing');
      return new Observable(observer => {
        observer.error('User not logged in or invalid user ID');
        observer.complete();
      });
    }

    const q = query(collection(this.firestore, 'favourites'), where('userId', '==', userId), where('productId', '==', productId));
    return from(getDocs(q)).pipe(
      map(snapshot => {
        console.log('Snapshot received for removeFavourite:', snapshot);
        snapshot.docs.forEach(doc => deleteDoc(doc.ref));
      }),
      catchError(error => {
        console.error('Error removing favourite:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        }
        throw error;
      })
    );
  }
}
