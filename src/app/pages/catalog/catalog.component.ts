import { Component, OnInit } from '@angular/core';
import { AuthProductService } from '../../core/auth-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports:[FormsModule,CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: any[] = [];

  constructor(private authProductService: AuthProductService) {}

  ngOnInit(): void {
    this.authProductService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addToFavourites(productId: string): void {
    this.authProductService.addFavourite(productId).subscribe(() => {
      console.log('Added to favourites:', productId);
    });
  }
}
