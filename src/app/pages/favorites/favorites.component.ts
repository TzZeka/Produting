import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favourites: any[] = [];

  constructor(private authService: AuthService, private productService: ProductService) {}

  ngOnInit() {
    const userId = this.authService.getCurrentUserId(); // Вземаме userId
    if (userId) {
      this.productService.getFavourites(userId).subscribe((data) => {
        this.favourites = data; // Записваме любимите продукти
      });
    }
  }

  addToFavourites(productId: string) {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.productService.addFavourite(userId, productId).subscribe(() => {
        console.log('Product added to favourites');
      });
    }
  }

  removeFromFavourites(productId: string) {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.productService.removeFavourite(userId, productId).subscribe(() => {
        console.log('Product removed from favourites');
      });
    }
  }
}
