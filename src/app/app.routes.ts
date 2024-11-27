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

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'search', component: SearchComponent },
    
    { path: 'my-products', component: MyProductsComponent },
    { path: 'create', component: CreateComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'favorites', component: FavoritesComponent },
    
];

