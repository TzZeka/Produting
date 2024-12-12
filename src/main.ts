import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp } from '@angular/fire/app'; 
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { CommonModule } from '@angular/common';
import { app } from './app/firebase-init'; // Импортирайте инициализирания Firebase app
import { ProductService } from './app/services/product.service';

// Стартирайте приложението
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => app),  // Използвайте инициализирания Firebase app
    provideFirestore(() => getFirestore()),
    CommonModule,
  ]
}).catch(err => console.error('Error during application bootstrap: ', err));
