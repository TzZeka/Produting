import { Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { SearchComponent } from './models/search/search.component';

import { MyProductsComponent } from './models/my-products/my-products.component';
import { CreateComponent } from './models/create/create.component';
import { CatalogComponent } from './models/catalog/catalog.component';
import { FavoritesComponent } from './models/favorites/favorites.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AlreadyLoggedInGuard } from './auth/already-logged-in.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent, canActivate: [AlreadyLoggedInGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [AlreadyLoggedInGuard]},

    { path: 'search', component: SearchComponent,canActivate: [AuthGuard] },
    
    { path: 'my-products', component: MyProductsComponent, canActivate: [AuthGuard] },
    { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
    { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard] },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent },
    
];

