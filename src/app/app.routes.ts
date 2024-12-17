import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { CreateComponent } from './pages/create/create.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProductDetailsComponent } from './views/product-details/product-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/already-logged-in.guard'; // Добавете NoAuthGuard

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
  
    { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },  // Защита за неавторизирани потребители
    { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },  // Защита за неавторизирани потребители
  
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'my-products', component: MyProductsComponent, canActivate: [AuthGuard] },
    { path: 'products/:id', component: ProductDetailsComponent},
    { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
    { path: 'catalog', component: CatalogComponent },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: '**', component: PageNotFoundComponent },
];
