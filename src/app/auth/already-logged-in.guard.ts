import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Функционален подход за проверка на състоянието на логване
export const alreadyLoggedInGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1), // Вземи само първото състояние
    map(isLoggedIn => {
      if (isLoggedIn) {
        router.navigate(['/page-not-found']); // Ако е логнат, пренасочваме към "page-not-found"
        return false;
      }
      return true; // Ако не е логнат, позволяваме достъп
    })
  );
};
