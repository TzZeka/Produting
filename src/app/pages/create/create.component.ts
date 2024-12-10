import { Component } from '@angular/core';
import { AuthProductService } from '../../core/auth-product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  newProduct = { name: '', description: '', price: 0 };

  constructor(private authProductService: AuthProductService) {}

  onSubmit(): void {
    this.authProductService.addProduct(this.newProduct).subscribe((productId) => {
      console.log('Product created with ID:', productId);
      this.newProduct = { name: '', description: '', price: 0 }; // Reset the form
    });
  }
}
