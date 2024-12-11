import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Гард за проверка дали потребителят е логнат
export const authGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1),
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};