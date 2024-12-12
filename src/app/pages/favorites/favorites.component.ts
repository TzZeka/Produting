import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.productService.getFavourites().subscribe((products) => {
      this.favorites = products;
    });
  }

  removeFromFavorites(productId: string): void {
    this.productService.removeFavourite(productId).subscribe(() => {
      this.favorites = this.favorites.filter(p => p.id !== productId);
    });
  }
}
