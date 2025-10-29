import { Routes } from '@angular/router';
import { PropertyListComponent } from './features/properties/property-list/property-list.component';
import { PropertyDetailsComponent } from './features/properties/property-details/property-details.component';
import { HomeComponent } from './features/home/home.component';

export const APP_ROUTES: Routes = [
  {  path: '', component: HomeComponent},
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: '**', redirectTo: '' }
];
