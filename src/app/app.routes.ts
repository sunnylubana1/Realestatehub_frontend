import { Routes } from '@angular/router';
import { PropertyListComponent } from './features/properties/property-list/property-list.component';
import { PropertyDetailsComponent } from './features/properties/property-details/property-details.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard, authCanMatchGuard } from './core/guards/auth.guard';
import { guestGuard, guestCanMatchGuard } from './core/guards/guest.guard';

export const APP_ROUTES: Routes = [


   // Public routes
  { path: '', component: HomeComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },

  // // Auth pages (only for guests)
  // { path: 'login', component: LoginComponent, canActivate: [guestGuard], canMatch: [guestCanMatchGuard] },
  // { path: 'register', component: RegisterComponent, canActivate: [guestGuard], canMatch: [guestCanMatchGuard] },

  // Fallback
  { path: '**', redirectTo: '' }
  // Protected routes
  // { path: '', component: HomeComponent, canActivate: [authGuard], canMatch: [authCanMatchGuard] },
  // { path: 'property/:id', component: PropertyDetailsComponent, canActivate: [authGuard], canMatch: [authCanMatchGuard] },

];
