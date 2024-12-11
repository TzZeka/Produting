import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Интерфейс за продукт
interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthProductService {

  constructor(
    private authService: AuthService, 
    private productService: ProductService
  ) {}

  // Проверка дали потребителят е логнат
  private isUserLoggedIn(): boolean {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      console.error('User is not logged in');
      return false;
    }
    return true;
  }

  // Получаване на продукти на конкретен потребител
  getMyProducts(): Observable<Product[]> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return EMPTY;  // Връща празен Observable, ако потребителят не е логнат
    }

    return this.productService.getProducts().pipe(
      catchError(error => {
        console.error('Error fetching user products:', error);
        return EMPTY;  // Връща празен Observable при грешка
      })
    );
  }

  // Получаване на любими продукти на конкретен потребител
  getFavourites(): Observable<Product[]> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return EMPTY;  // Връща празен Observable, ако потребителят не е логнат
    }

    return this.productService.getFavourites(userId).pipe(
      catchError(error => {
        console.error('Error fetching favourites:', error);
        return EMPTY;  // Връща празен Observable при грешка
      })
    );
  }

  // Добавяне на нов продукт
  addProduct(product: Product): Observable<string> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return EMPTY;  // Връща празен Observable, ако потребителят не е логнат
    }

    return this.productService.addProduct({ ...product, userId }).pipe(
      catchError(error => {
        console.error('Error adding product:', error);
        return EMPTY;  // Връща празен Observable при грешка
      })
    );
  }
  

  // Добавяне на продукт в любими
  addFavourite(productId: string): Observable<string> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return EMPTY;  // Връща празен Observable, ако потребителят не е логнат
    }

    return this.productService.addFavourite(userId, productId).pipe(
      catchError(error => {
        console.error('Error adding favourite:', error);
        return EMPTY;  // Връща празен Observable при грешка
      })
    );
  }

  // Премахване на продукт от любими
  removeFavourite(productId: string): Observable<void> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return EMPTY;  // Връща празен Observable, ако потребителят не е логнат
    }

    return this.productService.removeFavourite(userId, productId).pipe(
      catchError(error => {
        console.error('Error removing favourite:', error);
        return EMPTY;  // Връща празен Observable при грешка
      })
    );
  }

  // Актуализиране на продукт
  updateProduct(id: string, product: Product): Observable<void> {
    return this.productService.updateProduct(id, product).pipe(
      catchError(error => {
        console.error('Error updating product:', error);
        return EMPTY;  // Връща празен Observable при грешка
      })
    );
  }

  // Изтриване на продукт
  deleteProduct(id: string): Observable<void> {
    return this.productService.deleteProduct(id).pipe(
      catchError(error => {
        console.error('Error deleting product:', error);
        return EMPTY;  // Връща празен Observable при грешка
      })
    );
  }
}
