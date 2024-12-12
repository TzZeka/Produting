import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebase-config';

// Инициализация на Firebase
const app = initializeApp(firebaseConfig);
export { app };
