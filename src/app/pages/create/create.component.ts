import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  newProduct: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    quantity: 1,
  };

  constructor(private productService: ProductService) {}

  createProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe((product) => {
      alert('Product created successfully!');
      // Навигация към съответната страница
    });
  }
}
