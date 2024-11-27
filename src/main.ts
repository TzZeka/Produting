import { initializeApp } from 'firebase/app';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './firebase-config';

// Инициализирайте приложението на Firebase
initializeApp(firebaseConfig);

// Стартирайте приложението
bootstrapApplication(AppComponent)
  .catch(err => console.error(err));

  