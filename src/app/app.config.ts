import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyCbDq5CcdJXrogZwPoUVOjsibY4R9OkvpI",
  authDomain: "produting-9fb14.firebaseapp.com",
  databaseURL: "https://produting-9fb14-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "produting-9fb14",
  storageBucket: "produting-9fb14.firebasestorage.app",
  messagingSenderId: "985943690620",
  appId: "1:985943690620:web:e32f63fe49e03a1ffae8f9",
  measurementId: "G-VEE6GH7GNW",
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // Инициализация на Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Инстанциите за Authentication и Firestore
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
