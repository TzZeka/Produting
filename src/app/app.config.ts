import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; 
import { firebaseConfig } from './config/firebase-config';  // Вашата конфигурация

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  // Вашите маршрути
    provideFirebaseApp(() => initializeApp(firebaseConfig)),  // Инициализация на Firebase
    provideFirestore(() => getFirestore()),  // Инициализация на Firestore
    
  ]
};

console.log('Hello Firestore');
