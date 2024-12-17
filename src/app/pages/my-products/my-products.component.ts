import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  myProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {  
    this.loadMyProducts();
  }

  loadMyProducts(): void {
    this.productService.getMyProducts().subscribe((products) => {
      this.myProducts = products;
    });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.myProducts = this.myProducts.filter(p => p.id !== productId);
    });
  }

  editProduct(productId: string): void {
    // Навигация към компонент за редактиране на продукт
    console.log(`Edit product: ${productId}`);
  }

  viewDetails(productId: string): void {
    console.log(`View details for product: ${productId}`);
  }
}
