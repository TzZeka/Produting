import { initializeApp } from 'firebase/app';
import { bootstrapApplication } from '@angular/platform-browser';


import { AppComponent } from './app/app.component';
import { firebaseConfig } from './firebase-config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { CommonModule } from '@angular/common';
// Инициализирайте приложението на Firebase
initializeApp(firebaseConfig);

// Стартирайте приложението
bootstrapApplication(AppComponent, {
providers: [
  provideRouter(routes),
  CommonModule,
 
]

 }).catch(err => console.error('Error during application bootstrap: ', err));

  