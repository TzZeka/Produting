import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  productsPerPage: number = 10;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToFavorites(productId: string): void {
    this.productService.addFavourite(productId).subscribe(() => {
      alert('Product added to favorites!');
    });
  }

  viewDetails(productId: string): void {
    // Навигация към детайлната страница на продукта (може да използва Angular Router)
    console.log(`View details for product: ${productId}`);
  }

  // Функция за странициране
  getPagedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.productsPerPage;
    return this.products.slice(start, start + this.productsPerPage);
  }
}
