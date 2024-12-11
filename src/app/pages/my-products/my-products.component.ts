import { Component, OnInit } from '@angular/core';
import { AuthProductService } from '../../core/auth-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-products',

  standalone: true,
  imports: [FormsModule,CommonModule],

  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  products: any[] = [];
  editProductData: any = { id: '', name: '', description: '', price: 0 }; // Структура за редактиране

  constructor(private authProductService: AuthProductService) {}

  ngOnInit(): void {
    // Зареждаме продуктите на потребителя при инициализация на компонента
    this.authProductService.getMyProducts().subscribe((data) => {
      this.products = data;
    });
  }

  // Метод за премахване на продукт
  deleteProduct(productId: string): void {
    this.authProductService.deleteProduct(productId).subscribe(() => {
      // Прекарваме списъка с продукти, като изтриваме конкретния продукт
      this.products = this.products.filter(product => product.id !== productId);
    });
  }

  // Метод за отваряне на форма за редактиране на продукт
  editProduct(product: any): void {
    // Попълваме данните в полетата за редактиране
    this.editProductData = { ...product };
  }

  // Метод за актуализиране на продукт
  updateProduct(): void {
    // Валидация на данни
    if (!this.editProductData.name || !this.editProductData.description) {
      console.log('Product data is incomplete!');
      return;
    }
  
    // Актуализиране на продукта чрез AuthProductService
    this.authProductService.updateProduct(this.editProductData.id, this.editProductData).subscribe({
      next: () => {
        console.log('Product updated successfully');
  
        // Презареждаме продуктите
        this.authProductService.getMyProducts().subscribe(data => {
          this.products = data;
        });
  
        // Изчистваме формата за редактиране
        this.editProductData = { id: '', name: '', description: '', price: 0 };
      },
      error: (error: Error) => {  // Добавяме типа на 'error' параметъра
        console.error('Error updating product:', error.message);  // Показваме само съобщението за грешка
      }
    });
  }
  
}