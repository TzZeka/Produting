import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Функционален подход за проверка на състоянието на логване
export const authGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1),  // Вземи само първото състояние
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/login']); // Пренасочва към login, ако потребителят не е логнат
        return false;
      }
      return true; // Позволява достъп, ако потребителят е логнат
    })
  );
};
