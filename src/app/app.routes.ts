import { Routes} from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';

import { SearchComponent } from './pages/search/search.component';

import { MyProductsComponent } from './pages/my-products/my-products.component';
import { CreateComponent } from './pages/create/create.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth/auth.guard';
import { alreadyLoggedInGuard } from './auth/already-logged-in.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent, canActivate: [alreadyLoggedInGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [alreadyLoggedInGuard] },
  
    { path: 'search', component: SearchComponent, canActivate: [authGuard] },
    { path: 'my-products', component: MyProductsComponent },
    { path: 'create', component: CreateComponent, canActivate: [authGuard] },
    { path: 'catalog', component: CatalogComponent},
    { path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },


    { path: '**', component: PageNotFoundComponent },
    
];

