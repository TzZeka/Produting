import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthGuard } from './auth/auth.guard';
import { ProductService } from './services/product.service';
import { NoAuthGuard } from './auth/already-logged-in.guard';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  // Вашите маршрути
    AuthGuard,
    ProductService,
    NoAuthGuard
  ]
};
